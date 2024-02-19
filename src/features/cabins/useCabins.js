import {useQuery, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import { createEditCabins, getCabins } from '../../services/apiCabins';


export default function useCabins(){
    const {data: cabins, isLoading} = useQuery({
        queryFn: getCabins,
        queryKey: ['cabins']
    })

    return {cabins, isLoading}
}