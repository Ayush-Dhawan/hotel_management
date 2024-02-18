import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { recoverPassword as recoverPasswordApi } from '../../services/apiAuth';


export default function useRecover(){
    const {mutate: recoverPassword, isLoading} =useMutation({
        mutationFn: ({email}) => recoverPasswordApi({email}),
        onSuccess: () =>{
            toast.success("Password recovery succesful!");
        },
        onError : (error) =>{
            toast.error(error.message)
        }
    })
    return {recoverPassword, isLoading};
}