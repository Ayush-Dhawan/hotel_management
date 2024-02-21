import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from 'react-hook-form';
import { useSignUp } from "./useSignUp";
import SpinnerMini from '../../ui/SpinnerMini'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {signUp, isSiginingUp} = useSignUp();
 const {register, formState, getValues, handleSubmit, reset} =  useForm();
 const {errors} = formState;
 const navigate = useNavigate();

 function onSubmit({fullName, email, password}){
    signUp({fullName, email, password}, {
      onSettled: () => {
        reset();
        navigate('/login');
        toast.success("Confirm your identity again before adding more admins")
      }
    })

 }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input disabled={isSiginingUp}  type="text" id="fullName"
        {...register("fullName", {required: "This field is required"})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input disabled={isSiginingUp}  type="email" id="email"
        {...register("email", {required: "This field is required", pattern: {value: /\S+@\S+\.\S+/, message: "Please provide a valid email address"}})} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={isSiginingUp}  type="password" id="password"
        {...register("password", {required: "This field is required", minLength: {value: 8, message: "Password should be atleast 8 characters long"}})} />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <Input disabled={isSiginingUp}  type="password" id="passwordConfirm"
        {...register("passwordConfirm", {required: "This field is required", validate: (value) => value === getValues().password || "Passwords do not match" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSiginingUp}  variation="secondary" type="reset">
          Cancel
        </Button>
        <Button  type="submit">{!isSiginingUp ? "Register new Admin" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
