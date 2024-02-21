import { useSearchParams } from "react-router-dom";
import {subDays} from 'date-fns'
import {useQuery} from '@tanstack/react-query'
import {getBookingsAfterDate, getStaysTodayActivity} from '../../services/apiBookings'


    function useTodayActivity(){
        const {data, isLoading} = useQuery({
            queryFn: () => getStaysTodayActivity(),
            queryKey: ['today-activity']
        })
        console.log("today activ", data)
        return {data, isLoading}
    }

    export default useTodayActivity