import { RocketContext } from "@/contexts/rockets.context";
import { getGithubUsersByNameMemo } from "@/httpApi/httpApi";
import { Autocomplete, Avatar, Box, debounce, TextField } from "@mui/material";
import { FormEvent, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddEditGithubUserProcess, IGithubUserDetails, IRocketContextData, IRocketListItem, UserActionProcess } from "../../types/common";
import styles from './CommonRocketBaseForm.module.scss';

const cssTextInput = ({
  width: '100%',
  mt: '15px'
});

const cssTextArea = ({
  width: '100%',
  my: '15px'
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
  const formRocketTitle = watch('title', '');
  const formRocketName = watch('name', '');
  const formRocketDescription = watch('description', '');
  const currUserAction: UserActionProcess = showAsEditMode ? UserActionProcess.EDIT : UserActionProcess.ADD;

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
      rocketContext.setCurrGithubUserSelected(
        new Map(currGithubUser.set(currUserAction, githubUserSelected))
      );
    }
  }

  const currSelectedGithubUser: IGithubUserDetails | null | undefined =
    rocketContext.currGithubUserSelected.get(currUserAction);

  return (<>
    <TextField
      sx={cssTextInput}
      label="Title"
      InputLabelProps={{ shrink: formRocketTitle !== '' }}
      variant="outlined"
      {...register('title', { required: true })}
    />
    <TextField
      sx={cssTextInput}
      label="Rocket Name"
      InputLabelProps={{ shrink: formRocketName !== '' }}
      variant="outlined"
      {...register('name', { required: true })}
    />
    <TextField
      multiline
      sx={cssTextArea}
      minRows={5}
      InputLabelProps={{ shrink: formRocketDescription !== '' }}
      label="Description"
      variant="outlined"
      {...register('description', { required: true })}
    />
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {currSelectedGithubUser && currSelectedGithubUser.avatar_url && <Avatar
        src={currSelectedGithubUser.avatar_url}
        className={styles.rocketCardImage}
        variant="square"
      />}
      <Autocomplete
        sx={{ width: 1 }}
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
            label="Github"
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
    </Box>
  </>);
}

export {
  validateFormValues,
  CommonRocketBaseForm
}