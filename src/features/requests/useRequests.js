import React from 'react'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import { getRequests } from '../../services/apiRequests'

export function useRequests() {
  const {isLoading, data: requests, error} = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests
  })


  return {isLoading, error, requests};
}

