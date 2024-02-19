import { useSearchParams } from "react-router-dom";
import {subDays} from 'date-fns'
import {useQuery} from '@tanstack/react-query'
import {getStaysAfterDate} from '../../services/apiBookings'



export function useRecentStays(){
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const {data: stays, isLoading} = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ['stays', `last-${numDays}`]
    });
    
    const confirmedStays = stays?.filter((stay) => stay.status != 'unconfirmed')

    return {stays, isLoading, confirmedStays, numDays}
}   