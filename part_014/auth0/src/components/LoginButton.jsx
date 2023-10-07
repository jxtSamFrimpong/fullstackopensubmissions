import { useAuth0 } from "@auth0/auth0-react";
import {
    useNavigate
} from 'react-router-dom'

const LoginButton = () => {
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();

    const loginHandler = () => {
        loginWithRedirect();
        navigate('/')
    }

    return <button onClick={loginHandler}>Log In</button>;
};

export default LoginButton;