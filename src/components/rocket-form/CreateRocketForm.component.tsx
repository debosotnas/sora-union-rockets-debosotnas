import { LegacyRef, ReactElement, useContext, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Card, Button, Spacer, Text, Loading } from "@nextui-org/react";
import { RocketContext } from "@/contexts/rockets.context";
import { IRocketContextData, IRocketListItem, TypeRocketItemToCreate } from "../types/basic";
import { httpCreateRocket } from "@/httpApi/httpApi";
import { CommonRocketBaseForm, validateFormValues } from "./CommonRocketBaseForm";

function CreateRocketForm(): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting } } = useForm();

  const rocketListContext: IRocketContextData = useContext(RocketContext);

  const clearFormFields = () => {
    formRef.current?.reset();
  };

  const createOrUpdateRocket = (values: FieldValues) => {
    values.preventDefault && values.preventDefault();

    // TODO: Add Error exception handler
    if (validateFormValues(values)) {
      const rocketToCreate: TypeRocketItemToCreate = {
        description: values.description,
        // TODO: update data type to an object (according to GH user info)
        // TODO: update with real user info
        githubUserInfo: values.githubUserInfo,
        name: values.name,
        title: values.title,
        dtcreation: new Date()
      };

      const createdRocket: IRocketListItem = httpCreateRocket(rocketToCreate);
      if (rocketListContext.addOrUpdateRocket) {
        rocketListContext.addOrUpdateRocket(createdRocket);
        clearFormFields();
      }
    }
  }

  return (
    <Card className="card-wrapper">
      <form ref={formRef} onSubmit={handleSubmit(createOrUpdateRocket)}>
        <Card.Header>
          <Text h2 css={{ m: 0, color: '$colors$primary' }}>New Rocket <i>✨🚀✨</i></Text>
        </Card.Header>
        <Card.Body>
          <CommonRocketBaseForm register={register} />
        </Card.Body>
        <Card.Footer css={{ justifyContent: 'center' }}>

          <Button 
            auto flat 
            color={'secondary'} 
            css={{ maxW: '50px' }}
            onPress={()=>{
              clearFormFields();
            }}
          >Clear</Button>
          <Spacer x={1} />
          <Button auto flat type="submit" color={'primary'}>
            {!isSubmitting ? `Add Rocket` : <Loading size={'sm'} />}</Button>
        </Card.Footer>
      </form>
    </Card>
  );
}


export default CreateRocketForm;