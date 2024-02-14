import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { login as loginApi } from "../../services/apiAuth";

export function useLogin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: login, isLoading: isLoggingIn} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),

        onSuccess: (user) =>{
            navigate("/dashboard", {replace: true}) //replace: true disables back button of browser
            queryClient.setQueryData(['user'], user.user) //set user cache
            toast.success("Logged in succesfully!")
        },

        onError: () => toast.error("Incorrect credentials")
    })

    return {login, isLoggingIn}
}