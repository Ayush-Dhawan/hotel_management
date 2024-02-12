import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { deleteGuest as deleteGuestApi } from '../../services/apiGuests'
import {useNavigate} from 'react-router-dom'


export default function useDeleteGuests(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: deleteGuest, isLoading: isDeletingGuest} = useMutation({
        mutationFn: (email) => deleteGuestApi(email),

        onSuccess: () =>{
            toast.success("guest deleted")
            queryClient.invalidateQueries({active: true})
        },

        onError: () => toast.error("Could not delete the guest")
    })

    return {deleteGuest, isDeletingGuest}
}
