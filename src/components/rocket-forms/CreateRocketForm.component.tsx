import { ReactElement, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { RocketContext } from "@/contexts/rockets.context";
import { IGithubUserDetails, IRocketContextData, IRocketListItem, TRocketItemToCreate, UserActionProcess } from "../../types/common";
import { httpCreateRocket } from "@/httpApi/httpApi";
import { CommonRocketBaseForm, validateFormValues } from "./CommonRocketBaseForm";
import { Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import styles from './CreateEditRocketForm.module.scss';

function CreateRocketForm(): ReactElement {
  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting } } = useForm();

  const rocketListContext: IRocketContextData = useContext(RocketContext);
    
  const clearFormFields = () => {
    rocketListContext.setCurrGithubUserSelected && rocketListContext.setCurrGithubUserSelected(
      new Map(rocketListContext.currGithubUserSelected.set(UserActionProcess.ADD, null))
    );    
    reset();
  };

  const createOrUpdateRocket = (values: FieldValues) => {
    values.preventDefault && values.preventDefault();

    const currAddUser: IGithubUserDetails = validateFormValues(values, rocketListContext, UserActionProcess.ADD)
    // TODO: Add Error exception handler
    if (currAddUser) {
      const rocketToCreate: TRocketItemToCreate = {
        description: values.description,
        // TODO: update data type to an object (according to GH user info)
        // TODO: update with real user info
        githubUserInfo: values.githubUserInfo,
        githubUserData: currAddUser,
        name: values.name,
        title: values.title,
        dtcreation: new Date()
      };

      const createdRocket: IRocketListItem = httpCreateRocket(rocketToCreate);
      if (rocketListContext.addOrUpdateRocket) {
        rocketListContext.addOrUpdateRocket(createdRocket);
        rocketListContext.setCurrGithubUserSelected && rocketListContext.setCurrGithubUserSelected(
            new Map(rocketListContext.currGithubUserSelected.set(UserActionProcess.ADD, null))
          );
        clearFormFields();
      }
    }
  }

  return (
    <Grid container spacing={16}>
      <Grid sx={{width: 1}} item>
        <Grid container justifyContent={{xs: 'center', md: 'left'}} spacing={16}>
          <Grid sx={{width: 1, maxWidth: 'md'}} item>
            <form onSubmit={handleSubmit(createOrUpdateRocket)}>
              <Paper className='paper-container-create' elevation={24}>
                <Typography component="h3" variant="h4" sx={{textAlign: 'center'}} gutterBottom>
                  New Rocket <b>✨🚀✨</b>
                </Typography>
                <Paper className={styles.formControlsContainer} sx={{bgcolor: 'transparent'}} elevation={0}>
                  <CommonRocketBaseForm register={register} watch={watch} setValue={setValue} />
                </Paper>
                <Paper className={styles.formCTAs} sx={{bgcolor: 'transparent'}} elevation={0}>
                  <Button variant="outlined" color="secondary" onClick={clearFormFields}>
                    Clear
                  </Button>
                  <Button variant="outlined" color="primary" type={'submit'}>
                  {!isSubmitting ? `Add Rocket` : <CircularProgress />}
                  </Button>
                </Paper>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default CreateRocketForm;