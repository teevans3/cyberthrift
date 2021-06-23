import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

    const loginHandler = () => {
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {            
            return res.json()
        })
        .then(resData => {
            if (resData.errors.length > 0) {
                return setErrorMessages(resData.errors);
            }
            props.setIsLoggedIn(true);
            props.setUsername(resData.user.username);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            return setRedirectAfterLogin(true);
        })
        .catch(err => {
            console.log(err);
            return setErrorMessages('Something went wrong - please try logging in again, later.')
        })
    }

    return (
        <>
            <h2>Login</h2>
            {errorMessages.length > 0 ? 
            <ul>
                {errorMessages.map(message => {
                    return (<li>{message}</li>)
                })}
            </ul> : null}
            <div>
                <Input type="email" label="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                <Input type="password" label="Password" id="password" onChange={(e) => setPassword(e.target.value)} />            
                <Button default onClick={() => loginHandler()}>Login</Button>
            </div>
            { redirectAfterLogin ? <Redirect to="/" /> : null}
        </>
    )
}

export default Login;