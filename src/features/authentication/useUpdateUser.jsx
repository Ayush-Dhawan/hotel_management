
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { updateCurrUser } from '../../services/apiAuth';

export default function useUpdateUser() {

    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
        mutationFn: ({fullName, password, avatar})=> updateCurrUser({fullName, password, avatar}),
        onSuccess: ({user}) => {
          // setShowForm((showForm) => !showForm)
          toast.success("User successfully updated");
          queryClient.setQueryData("user", user)
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message),
      });
    
  return {updateUser, isUpdatingUser}
}
