import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { deleteRequest as deleteRequestApi } from '../../services/apiRequests'
import {useNavigate} from 'react-router-dom'


export default function useDeleteRequest(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: deleteRequest, isLoading: isDeletingRequest} = useMutation({
        mutationFn: (requestId) => deleteRequestApi(requestId),

        onSuccess: () =>{
            toast.success('Request has been declined!')
            queryClient.invalidateQueries({active: true})
            navigate("/requests")
        },

        onError: () => toast.error("Could not decline the request")
    })

    return {deleteRequest, isDeletingRequest}
}

export function useDeleteRequestIndirect(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: deleteRequestIndirect, isLoading: isDeletingRequest} = useMutation({
        mutationFn: (requestId) => deleteRequestApi(requestId),

        onSuccess: () =>{
            queryClient.invalidateQueries({active: true})
            navigate("/requests")
        },

        onError: () => toast.error("Could not decline the request")
    })

    return {deleteRequestIndirect, isDeletingRequest}
}