import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { userLogout } from "../../services/apiAuth";


export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: logout, isLoading: isLoggingOut} = useMutation({
        mutationFn: userLogout,

        onSuccess: () =>{
            navigate("/login", {replace: true}); //replace: true disables back button of browser
            queryClient.removeQueries(); //clear cache data
            toast.success("Logged out succesfully!");
        },

        onError: (error) => toast.error(error.message)
    })

    return {logout, isLoggingOut}
}