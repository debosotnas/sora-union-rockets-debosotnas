import { RocketContext } from "@/contexts/rockets.context";
import { getGithubUsersByNameMemo } from "@/httpApi/httpApi";
import { Autocomplete, debounce, TextField } from "@mui/material";
import { Input, Spacer, Textarea, Dropdown, Text } from "@nextui-org/react";
import { FormEvent, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IGithubUserDetails, IRocketContextData, IRocketListItem } from "../types/common";
import styles from './CommonRocketBaseForm.module.scss';

const cssInput = ({
  width: '100%',
  mt: 5
});

function validateFormValues(values: FieldValues) {
  return true;
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

  const [githubUserResultSearch, setGithubUsersResultSearch] = useState<Array<IGithubUserDetails>>([]);
  const [isOpenGithubBox, setIsOpenGithubBox] = useState<boolean>(false);
  const githubBoxRef = useRef<HTMLDivElement>(null);
  const rocketListContext: IRocketContextData = useContext(RocketContext);





  const [valueAuto, setValueAuto] = useState<IGithubUserDetails | null>(null);
  const [options, setOptions] = useState<readonly IGithubUserDetails[]>([]);
  const [inputValue, setInputValue] = useState<string>('');



  //-----------------------------
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
            console.log('>>namesList: ', namesList.items);
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

  /////////////////////-----------------------

  return (<>
    <Spacer y={.5} />
    <TextField
      label="Title"
      variant="outlined"
      {...register('title', { required: true })}
    />
    <Spacer y={1.5} />
    <TextField
      label="Rocket Name"
      variant="outlined"
      {...register('name', { required: true })}
    />
    <Spacer y={1} />
    <TextField
      multiline
      minRows={5}
      label="Description"
      variant="outlined"
      {...register('description', { required: true })}
    />
    <Spacer y={1.5} />
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
        console.log('>>> ON INPUT CHANGE! -> type event: ', event, ' -- newInputValue: ', newInputValue);
        // if (event.type === 'change' || event.type === 'input') {
        setInputValue(newInputValue);
        // }
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
        setValue('githubUserInfo', newValue?.login); // here or
        setValueAuto(newValue);
      }}
    ></Autocomplete>
  </>);
}

export {
  validateFormValues,
  CommonRocketBaseForm
}