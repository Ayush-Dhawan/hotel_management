import {useQuery, useQueryClient} from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

export function useUser(){
    const {data: user, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })

    const isAuthenticated = user?.role === "authenticated"

    return {user, isLoading, isAuthenticated}
}