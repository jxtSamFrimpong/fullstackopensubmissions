import { useAuth0 } from "@auth0/auth0-react";
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer';
import { setLoggedInFalse } from '../reducers/loggedInReducer';

const LogoutButton = () => {
    const { logout } = useAuth0();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.setItem('user', null)
        dispatch(setLoggedInFalse());
        dispatch(setUser(null));
    }

    return (
        <button onClick={logoutHandler}>
            Log Out
        </button>
    );
};

export default LogoutButton;