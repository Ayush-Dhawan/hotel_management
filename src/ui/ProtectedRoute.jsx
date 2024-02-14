import React, {useEffect} from 'react'
import Proptypes from 'prop-types'
import { useUser } from '../features/authentication/useUser'
import Spinner from '../ui/Spinner'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const FullPage = styled.div`
height: 100vh;
width: 100vw;
background-color: var(--color-grey-50);
display: flex;
justify-content: center;
align-items: center;
`

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();

    //1. Load the authenticated user
    const {user, isLoading, isAuthenticated} = useUser();

     //2. if there isnt any authenticated user, redirect to '/login'
    // if(!isAuthenticated && !isLoading) navigate('/login') //this will work in this case too but its a good practice to wrap this in a useEffect
    useEffect(() =>{
        if(!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])
//if we place the use effect below any if statement in the function we do get an error so it must be at top level

    //3. show spinner in loading state
    if(isLoading) return <FullPage> <Spinner /> </FullPage>


    //4. if there is a user render the application
 if(isAuthenticated && !isLoading) return children
}


ProtectedRoute.propTypes = {
    children : Proptypes.any
}
