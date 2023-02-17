import { RocketContext } from "@/contexts/rockets.context";
import { getGithubUsersByNameMemo } from "@/httpApi/httpApi";
import { Autocomplete, debounce, TextField } from "@mui/material";
import { FormEvent, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddEditGithubUserProcess, IGithubUserDetails, IRocketContextData, IRocketListItem, UserActionProcess } from "../../types/common";
import styles from './CommonRocketBaseForm.module.scss';

const cssInput = ({
  width: '100%',
  mt: 5
});

function validateFormValues(values: FieldValues, ctx: IRocketContextData, uap: UserActionProcess) {
  const addEditGithubUser: AddEditGithubUserProcess = ctx.currGithubUserSelected;
  const currEditGithubUser: IGithubUserDetails | null | undefined = addEditGithubUser.get(uap);
  //NOTE: more robust check will be needed in future
  return values.title && 
            values.name && 
            values.description && 
            values.githubUserInfo === currEditGithubUser?.login &&
            (currEditGithubUser ? currEditGithubUser : false);
}

const getGithubUsersByName = getGithubUsersByNameMemo();

function CommonRocketBaseForm({
  register,
  watch,
  setValue,
  formValues,
  showAsEditMode
  }: {
    register: UseFormRegister<Partial<IRocketListItem>>,
    watch: UseFormWatch<FieldValues>,
    setValue: UseFormSetValue<FieldValues>,
    formValues?: Partial<IRocketListItem>,
    showAsEditMode?: boolean
  }) {

  const rocketContext: IRocketContextData = useContext(RocketContext);

  const [valueAuto, setValueAuto] = useState<IGithubUserDetails | null>(null);
  const [options, setOptions] = useState<readonly IGithubUserDetails[]>([]);
  const [inputValue, setInputValue] = useState<string>('');


  const githubName = watch('githubUserInfo', '');

  const getOptions = (options: readonly IGithubUserDetails[]) => {
    const uniqueMap: Map<number, IGithubUserDetails> = new Map();
    options.forEach((opt: IGithubUserDetails) => {
      uniqueMap.set(opt.id, opt);
    });
    return Array.from(uniqueMap).map(
      ([key, val]) => val
    );
  }

  const fetch = useMemo(
    () =>
      debounce(
        async (
          request: { input: string },
          callback: (results?: readonly IGithubUserDetails[]) => void,
        ) => {
          const namesList = await getGithubUsersByName(request.input);
          if (namesList !== false) {
            const githubUsers: Array<IGithubUserDetails> = namesList.items;
            callback(githubUsers);
          }
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(valueAuto ? [valueAuto] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results?: readonly IGithubUserDetails[]) => {
      if (active) {
        let newOptions: readonly IGithubUserDetails[] = [];

        if (valueAuto) {
          newOptions = [valueAuto];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(getOptions(newOptions));
      }
    });

    return () => {
      active = false;
    };
  }, [valueAuto, inputValue, fetch]);

  const updateAutompleteAndContextValues = (githubUserSelected: IGithubUserDetails | null) => {
    setValue('githubUserInfo', githubUserSelected?.login); // here or
    setValueAuto(githubUserSelected);
    if (rocketContext.setCurrGithubUserSelected) {
      const currGithubUser: AddEditGithubUserProcess = rocketContext.currGithubUserSelected;
      const currUserAction: UserActionProcess = showAsEditMode ? UserActionProcess.EDIT : UserActionProcess.ADD; 
      rocketContext.setCurrGithubUserSelected(
        new Map(currGithubUser.set(currUserAction, githubUserSelected))
      );
    }
  }

  return (<>
    <TextField
      className={styles.formTextField}
      label="Title"
      variant="outlined"
      {...register('title', { required: true })}
    />
    <TextField
      className={styles.formTextField}
      label="Rocket Name"
      variant="outlined"
      {...register('name', { required: true })}
    />
    <TextField
      multiline
      className={styles.formTextArea}
      minRows={5}
      label="Description"
      variant="outlined"
      {...register('description', { required: true })}
    />
    <Autocomplete
      autoComplete
      disablePortal={showAsEditMode}
      includeInputInList
      filterSelectedOptions
      filterOptions={(x) => x}
      options={options}
      value={valueAuto}
      inputValue={githubName}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      noOptionsText="No User found"
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Githubuser"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          {...register('githubUserInfo', {
            required: true,
          })}
        />
      )}
      getOptionLabel={(option) => {
        return option.login
      }}
      renderOption={(props, option) => {
        const matches: IGithubUserDetails = option || {};
        const nameToShow = matches?.login;
        const avatarUrl = matches?.avatar_url;
        return <li {...props}>< img className={styles.optionAvatarImg} src={avatarUrl} />{nameToShow}</li>;
      }}
      onChange={(event: any, newValue: IGithubUserDetails | null) => {
        setOptions(newValue ? getOptions([newValue, ...options]) : options);
        updateAutompleteAndContextValues(newValue);
      }}
    ></Autocomplete>
  </>);
}

export {
  validateFormValues,
  CommonRocketBaseForm
}