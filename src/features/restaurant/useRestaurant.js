import {useQuery, useQueryClient} from '@tanstack/react-query'
import { getRestaurant } from '../../services/apiRestaurant';


export default function useRestaurant(){
    const {data: restaurantMenu, isLoading} = useQuery({
        queryFn: getRestaurant,
        queryKey: ['restaurant']
    })
    return {restaurantMenu, isLoading}
}