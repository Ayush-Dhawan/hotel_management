

import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { createEditDishes } from '../../services/apiRestaurant';

export default function useCreateDish() {
    const queryClient = useQueryClient();

    const { mutate: createDish, isLoading: isCreating } = useMutation({
      mutationFn: createEditDishes,
      onSuccess: () => {
        // setShowForm((showForm) => !showForm)
        toast.success("New dish successfully created");
        queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      },
      onError: (err) => toast.error(err.message),
    });
  
  return {isCreating, createDish}
}
