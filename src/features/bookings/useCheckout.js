import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { updateBooking } from '../../services/apiBookings'
import {useNavigate} from 'react-router-dom'



export function useCheckout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId) =>{
           return updateBooking(bookingId, {status: "checked-out"})
        },
        onSuccess: (data) =>{
            toast.success(`Succesfully checked out #${data.id}`)
            queryClient.invalidateQueries({active: true})
            navigate('/dashboard')
        },
        onError: () => toast.error("error checking out")
    })

    return {checkout, isCheckingOut}
}