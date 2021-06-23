import React from 'react'
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Navigation = (props) => {

    return (
        <NavContainer>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shoes">Shoes</NavLink>
                <NavLink to="/tops">Tops</NavLink>
                <NavLink to="/bottoms">Bottoms</NavLink>
                <NavLink to="/accessories">Accessories</NavLink>
                <NavLink to="/jackets">Jackets</NavLink>
                {
                props.isLoggedIn ?
                    <>
                    <NavLink to={`/${props.username}/profile`}>My Profile</NavLink>
                    <button type="submit" onClick={props.logoutHandler}>Log Out</button>
                    </> 
                   :
                    <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                    </>
                }   
            </nav>
        </NavContainer>
    )
}

export default Navigation;

const NavContainer = styled.header`
    height: 3rem;

    & nav {
        display: flex;
        justify-content: space-around;
    }

    & a {
        text-decoration: none;
        color: black;
    }

    & a:hover {
        font-weight: bold;
    }
`