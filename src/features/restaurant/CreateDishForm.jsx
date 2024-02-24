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
import useCreateDish from "./useCreateDish";
import useEditDish from "./useEditDish";
import SpinnerMini from '../../ui/SpinnerMini'

function CreateDishForm({showForm, setShowForm, dishToEdit ={}, onCloseModal,showEditModal}) {

  const {id: editID, ...editValues} = dishToEdit;
  let editSession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues: {}
  });
  const { errors } = formState;


 const {isCreating, createDish} = useCreateDish();
  const {isEditing, editDish} = useEditDish();
  
  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image == 'string' ? data.image : data.image[0];
    console.log("data->", data.image)
    // const image = data.image[0];
    if(editSession) editDish({newDish: {...data, image}, id: editID}, {
      onSuccess: () => {
        reset()
        showEditModal?.()
      }
    });
    else createDish({ ...data, image: image }, {
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
      <FormRow label="Dish name" error={errors?.dishName?.message}>
        <Input
          type="text" 
          id="name"
          disabled={isWorking}
          {...register("dishName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          disabled={isWorking}
          {...register("category", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.type?.message}>
        <Input
          type="text"
          id="type"
          disabled={isWorking}
          {...register("type", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isCreating}
          {...register("price", {
            required: "This field is required",
          })}
        />
      </FormRow>


      <FormRow
        label="Description for website"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Dish photo">
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
        {!isWorking ? <Button disabled={isWorking}>{editSession ? "Edit dish" : "Add dish"}</Button> : <SpinnerMini />}
      </FormRow>
    </Form>
  );
}

CreateDishForm.propTypes = {
  dishToEdit: PropTypes.object,
  showForm : PropTypes.bool,
  setShowForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  showEditModal: PropTypes.func,
};


export default CreateDishForm;