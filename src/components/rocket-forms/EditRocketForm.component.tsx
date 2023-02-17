import { ReactElement, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { RocketContext } from "@/contexts/rockets.context";
import { IGithubUserDetails, IRocketContextData, IRocketListItem, UserActionProcess } from "../../types/common";
import { httpUpdateRocket } from "@/httpApi/httpApi";
import { CommonRocketBaseForm, validateFormValues } from "./CommonRocketBaseForm";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import styles from './CreateEditRocketForm.module.scss';

function EditRocketForm(
  { rocketInfo: formValues }: { rocketInfo?: Partial<IRocketListItem> }
): ReactElement {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting } } = useForm({
      defaultValues: formValues !== null ? formValues : {}
    });

  const rocketListContext: IRocketContextData = useContext(RocketContext);

  const closeEditHandler = () => {
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(false);
  };

  const updateRocket = (values: FieldValues) => {
    values.preventDefault && values.preventDefault();

    // TODO: Add Error exception handler
    const currEditUser: IGithubUserDetails = validateFormValues(values, rocketListContext, UserActionProcess.EDIT);
    if (currEditUser && formValues && formValues.id) {
      const rocketToUpdate: IRocketListItem = {
        description: values.description,
        id: formValues.id,
        githubUserInfo: values.githubUserInfo,
        githubUserData: currEditUser,
        name: values.name,
        title: values.title,
        dtupdated: new Date()
      };

      const updatedRocket = httpUpdateRocket(rocketToUpdate);
      if (rocketListContext.addOrUpdateRocket) {
        rocketListContext.addOrUpdateRocket(updatedRocket);
        rocketListContext.setCurrGithubUserSelected && rocketListContext.setCurrGithubUserSelected(
          new Map(rocketListContext.currGithubUserSelected.set(UserActionProcess.EDIT, null))
        );
        closeEditHandler();
      }
    }
  }

  return (
        <form onSubmit={handleSubmit(updateRocket)}>
          <Paper className={styles.formContainer} elevation={0}>
            <Typography component="h3" variant="h4" gutterBottom>
              Edit Card <i>✨🚀✨</i>
            </Typography>
            <Paper className={styles.formControlsContainer} elevation={0}>
              <CommonRocketBaseForm
                register={register}
                watch={watch}
                setValue={setValue}
                formValues={formValues}
                showAsEditMode={true} />
            </Paper>
            <Paper className={styles.formCTAs} elevation={0}>
              <Button variant="outlined" color="secondary" onClick={closeEditHandler}>
                Cancel
              </Button>
              <Button variant="outlined" color="primary" type={'submit'}>
                {!isSubmitting ? `Save` : <CircularProgress />}
              </Button>
            </Paper>
          </Paper>
        </form>
  );
}


export default EditRocketForm;