import { FormEvent, ReactElement, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Card, Button, Input, Spacer, Textarea, Text, Loading } from "@nextui-org/react";
import { RocketContext } from "@/contexts/rockets.context";
import { IRocketContextData, IRocketListItem } from "../types/basic";

const cssInput = ({
  width: '100%',
  mt: 5
});



function CreateRocketForm(): ReactElement {

  const rocketListContext: IRocketContextData = useContext(RocketContext);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const saveNewRocket = (values: FieldValues) => {
    values.preventDefault && values.preventDefault();
    const rocket: IRocketListItem = {
      id: Math.ceil(Math.random() * +(new Date())),
      description: values.description,
      githubUserInfo: values.githubUserInfo,
      name: values.name,
      title: values.title
    };
    if (rocketListContext.addOrUpdateRocket) {
      rocketListContext.addOrUpdateRocket(rocket);
    }
    // httpCreateRocket();
  }

  return (
    <form onSubmit={handleSubmit(saveNewRocket)}>
      <Card css={{ $$cardColor: '#fefefe' }}>
        <Card.Header>
          <Text h2 css={{ m: 0, color: '$colors$primary' }}>New Rocket!!! <i>✨🚀✨</i></Text>
        </Card.Header>
        <Card.Body>
          <Spacer y={.5} />
          <Input
            css={cssInput}
            clearable bordered
            labelPlaceholder="Title" initialValue=""
            {...register('title', { required: true })} />
          <Spacer y={1.5} />
          <Input css={cssInput}
            clearable bordered
            labelPlaceholder="Rocket Name" initialValue=""
            {...register('name', { required: true })} />
          <Spacer y={1} />
          <Textarea
            css={{ ...cssInput, mt: 10 }}
            aria-label="Description"
            placeholder="Description"
            {...register('description', { required: true })}
          />
          <Spacer y={1.5} />
          <Input css={cssInput}
            clearable bordered
            labelPlaceholder="Github User" initialValue=""
            {...register('githubuser', { required: true })} />
        </Card.Body>
        <Card.Footer css={{ justifyContent: 'center' }}>
          <Button flat type="submit" color={'primary'}>
            { !isSubmitting ? `Add Card!` : <Loading size={'sm'} /> }</Button>
        </Card.Footer>
      </Card>
    </form>
  );
}

export default CreateRocketForm;