import { Input, Spacer, Textarea } from "@nextui-org/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IRocketListItem } from "../types/basic";

const cssInput = ({
  width: '100%',
  mt: 5
});

function validateFormValues(values: FieldValues) {
  return true;
}

function CommonRocketBaseForm({
              register,
              formValues}: {
                register: UseFormRegister<Partial<IRocketListItem>>,
                formValues?: Partial<IRocketListItem>
              }) {

    return (<>
              <Spacer y={.5} />
            <Input
              css={cssInput} clearable bordered
              initialValue={formValues?.title} labelPlaceholder="Title"
              {...register('title', { required: true })} />
            <Spacer y={1.5} />
            <Input css={cssInput}
              clearable bordered
              initialValue={formValues?.name} labelPlaceholder="Rocket Name"
              {...register('name', { required: true })} />
            <Spacer y={1} />
            <Textarea
              css={{ ...cssInput, mt: 10 }}
              aria-label="Description" placeholder="Description"
              {...register('description', { required: true })}
            />
            <Spacer y={1.5} />
            <Input css={cssInput}
              clearable bordered
              initialValue={formValues?.githubUserInfo} labelPlaceholder="Github User"
              {...register('githubUserInfo', { required: true })} />
    </>);
  }

export {
  validateFormValues,
  CommonRocketBaseForm
}