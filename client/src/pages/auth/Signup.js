import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Signup = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);
    const [redirectAfterSignup, setRedirectAfterSignup] = useState(false);

    const signupHandler = () => {
        fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(res => {            
                return res.json();
            })
            .then(resData => {
                if (resData.errors.length > 0) {
                    return setErrorMessages(resData.errors);
                }
                return setRedirectAfterSignup(true);
            })
            .catch(err => {
                console.log(err);
                return setErrorMessages('Something went wrong - please try signing up again, later.')
            })
        
    }
    return (
        <>
            <h2>Signup</h2>
            {errorMessages.length > 0 ? 
            <ul>
                {errorMessages.map(message => {
                    return (<li>{message}</li>)
                })}
            </ul> : null}
            <div>
                <Input type="text" label="Username" id="username" onChange={(e) => setUsername(e.target.value)}/>
                <Input type="email" label="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                <Input type="password" label="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <Input type="password" label="Confirm Password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button default onClick={() => signupHandler()}>Signup</Button>
            </div>
            { redirectAfterSignup ? <Redirect to="/login" /> : null}
        </>
    )
}

export default Signup;