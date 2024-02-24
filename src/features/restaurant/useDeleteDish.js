import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import CreateDishForm from './CreateDishForm';
import { deleteDishes } from '../../services/apiRestaurant';


export default function useDeleteDish(){
    const queryClient = useQueryClient();

    const {mutate: deleteDish, isLoading: isDeleting} = useMutation({
        mutationFn: (id) => deleteDishes(id),
        onSuccess: () => {
            // setShowForm((showForm) => !showForm)
            toast.success("Dish successfully removed from the menu");
            queryClient.invalidateQueries({ queryKey: ["restaurant"] });
          },
          onError: (err) => toast.error(err.message),
    })

    return {deleteDish, isDeleting}
}