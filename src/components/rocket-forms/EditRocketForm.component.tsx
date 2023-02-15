import { ReactElement, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Card, Button, Spacer, Text, Loading } from "@nextui-org/react";
import { RocketContext } from "@/contexts/rockets.context";
import { IRocketContextData, IRocketListItem } from "../types/common";
import { httpUpdateRocket } from "@/httpApi/httpApi";
import { CommonRocketBaseForm, validateFormValues } from "./CommonRocketBaseForm";

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
    if (formValues && formValues.id) {

      if(!validateFormValues(formValues)) {
        //TODO: Exception errors on invalid formValues
        return;
      }

      const rocketToUpdate: IRocketListItem = {
        description: values.description,
        id: formValues.id,
        // TODO: update data type to an object (according to GH user info)
        // TODO: update with real user info
        githubUserInfo: values.githubUserInfo,
        name: values.name,
        title: values.title,
        dtupdated: new Date()
      };

      const updatedRocket = httpUpdateRocket(rocketToUpdate);
      if (rocketListContext.addOrUpdateRocket) {
        rocketListContext.addOrUpdateRocket(updatedRocket);
        closeEditHandler();
      }
    }
  }

  return (
    <Card className="card-wrapper">
      <form onSubmit={handleSubmit(updateRocket)}>
        <Card.Header>
          <Text h2 css={{ m: 0, color: '$colors$primary' }}>Edit Card <i>✨🚀✨</i></Text>
        </Card.Header>
        <Card.Body>
            <CommonRocketBaseForm
              register={register}
              watch={watch}
              setValue={setValue}
              formValues={formValues}
              showAsEditMode={true} />
        </Card.Body>
        <Card.Footer css={{ justifyContent: 'center' }}>
          <Button auto flat color={'secondary'} onClick={() => {closeEditHandler}} 
            css={{ maxW: '50px' }}>Cancel</Button>
          <Spacer x={1} />
          <Button auto flat type="submit" color={'primary'}>
            {!isSubmitting ? `Save` : <Loading size={'sm'} />}</Button>
        </Card.Footer>
      </form>
    </Card>
  );
}


export default EditRocketForm;