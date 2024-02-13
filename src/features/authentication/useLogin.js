import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { login as loginApi } from "../../services/apiAuth";

export function useLogin(){
    const navigate = useNavigate();

    const {mutate: login, isLoading: isLoggingIn} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),

        onSuccess: () =>{
            navigate("/dashboard")
            toast.success("Logged in succesfully!")
        },

        onError: () => toast.error("Incorrect credentials")
    })

    return {login, isLoggingIn}
}