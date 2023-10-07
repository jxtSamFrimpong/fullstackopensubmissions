// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux'
import {
    Navigate
} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import { setUser } from '../reducers/userReducer';
import { setLoggedInTrue } from '../reducers/loggedInReducer';

const HomePage = () => {
    //const loggedIn = useSelector(({ loggedIn }) => loggedIn)
    const dispatch = useDispatch()
    const { user, isAuthenticated, isLoading } = useAuth0();
    useEffect(() => {
        dispatch(setUser(user));
        dispatch(setLoggedInTrue());
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("loggedIn", isAuthenticated)
        console.log('user', user)
    }, [isAuthenticated])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !isAuthenticated ?
            <Navigate replace={true} to={'/login'} />
            : <div>
                Welcome My Guy
                {user.nickname}
                <div>birthdate {user.birthdate}</div>
                <img src={user.picture}></img>
            </div>
    )
}

export default HomePage;