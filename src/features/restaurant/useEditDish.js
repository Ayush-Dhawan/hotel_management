
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import CreateDishForm from './CreateDishForm';
import { createEditDishes } from '../../services/apiRestaurant';

export default function useEditDish() {

    const queryClient = useQueryClient();

    const { mutate: editDish, isLoading: isEditing } = useMutation({
        mutationFn: ({newDish, id}) => createEditDishes(newDish, id),
        onSuccess: () => {
          // setShowForm((showForm) => !showForm)
          toast.success("Dish successfully edited");
          queryClient.invalidateQueries({ queryKey: ["restaurant"] });
        },
        onError: (err) => toast.error(err.message),
      });
    
  return {isEditing, editDish}
}
