
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { createEditCabins } from '../../services/apiCabins';

export default function useEditCabin() {

    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabins(newCabinData, id),
        onSuccess: () => {
          // setShowForm((showForm) => !showForm)
          toast.success("Cabin successfully edited");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
      });
    
  return {isEditing, editCabin}
}
