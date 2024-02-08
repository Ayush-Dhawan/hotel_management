import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabins } from "../../services/apiCabins";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({showForm, setShowForm, cabinToEdit ={}, onCloseModal,showEditModal}) {

  const {id: editID, ...editValues} = cabinToEdit;
  let editSession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues: {}
  });
  const { errors } = formState;


 const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  
  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image == 'string' ? data.image : data.image[0];
    if(editSession) editCabin({newCabinData: {...data, image}, id: editID}, {
      onSuccess: () => {
        reset()
        showEditModal?.()
      }
    });
    else createCabin({ ...data, image: image }, {
      onSuccess: () => {
        reset()
        onCloseModal?.()
      }
    });
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal || showEditModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice||
              "Discount should be less than regular price and atleast 0",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: editSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => {onCloseModal?.() 
          showEditModal?.()}}>
          Cancel
        </Button>
        <Button disabled={isCreating}>{editSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  showForm : PropTypes.bool,
  setShowForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  showEditModal: PropTypes.func,
};


export default CreateCabinForm;