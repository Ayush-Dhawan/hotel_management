
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { insertBooking } from '../../services/apiBookings'
import {useNavigate} from 'react-router-dom'

export default function useConfirmRequest() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: confirmRequest, isLoading: isConfirmingRequest} = useMutation({
        mutationFn: (booking) => insertBooking(booking),

        onSuccess: () => {
            toast.success(`Request successfully confirmed in`);
            queryClient.invalidateQueries({ active: true });
            navigate("/requests");
        },
        onError: () => toast.error("There was an error while confirming the booking"),
    })

    return {confirmRequest, isConfirmingRequest}
}
