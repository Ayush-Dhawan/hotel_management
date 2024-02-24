import {useMutation } from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { signUp as signUpApi } from "../../services/apiAuth";



export function useSignUp(){
    const {mutate: signUp, isLoading: isSigningUp} = useMutation({
        mutationFn: signUpApi,
        onSuccess: () =>{
            toast.success("Account succesfully created!...Please verify the account via the employee's email address")
        },
        onError : (error) =>{
            toast.error(error.message)
        }
    })

    return{signUp, isSigningUp}
}