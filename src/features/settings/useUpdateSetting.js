import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { createEditCabins } from '../../services/apiCabins';
import {updateSetting as updateSettingApi} from '../../services/apiSettings'


export default function useUpdateSetting() {
    const queryClient = useQueryClient();

    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () =>{
            toast.success("Succesfully updated the settings");
            queryClient.invalidateQueries({queryKey: ['settings']})
        },
        onError: (err) => toast.error(err.message)
    })

    return {updateSetting, isUpdating}
}
