
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { deleteCabins as deleteCabinsApi } from '../../services/apiCabins';

export default function useDeleteCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinsApi(id),
    onSuccess: () => {
        toast.success("Cabin succesfully deleted")
        queryClient.invalidateQueries({
        queryKey: ['cabins']
    })},    
    onError: err => toast.error(err.message)
    })

  return {isDeleting, deleteCabin}
}
