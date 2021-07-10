import React, {useState} from 'react'
import {NavLink} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';

import HomeName from '../components/UI/HomeName';
import NavButton from '../components/Buttons/NavButton';
import Divider from '../components/UI/Divider';

const Navigation = (props) => {

    return (
        <NavContainer>
            <nav>
                <NavButton onClick={() => props.setToggleMenu(true)} home={window.location.pathname.toString() === '/' ? true : false}><i class="fas fa-bars fa-3x"></i></NavButton>
                <MenuContainer ref={props.menuRef} className="prodLinks" display={props.toggleMenu}>
                    <NavButton onClick={() => props.setToggleMenu(false)} close><i class="fas fa-window-close fa-2x" ></i></NavButton>
                    <MenuLink exact to="/" onClick={() => props.setToggleMenu(false)}>Home</MenuLink>
                    <MenuHashLink smooth to="/#about" onClick={() => props.setToggleMenu(false)}>About</MenuHashLink>
                    <Divider />
                    <MenuLink to="/shoes" products onClick={() => props.setToggleMenu(false)}>Shoes</MenuLink>
                    <MenuLink to="/tops" products onClick={() => props.setToggleMenu(false)}>Tops</MenuLink>
                    <MenuLink to="/bottoms" products onClick={() => props.setToggleMenu(false)}>Bottoms</MenuLink>
                    <MenuLink to="/accessories" products onClick={() => props.setToggleMenu(false)}>Accessories</MenuLink>
                    <MenuLink to="/jackets" products onClick={() => props.setToggleMenu(false)}>Jackets</MenuLink>
                    {props.isLoggedIn ?
                    <>
                        <Divider />
                        <MenuLink to={`/${props.username}/profile`} onClick={() => props.setToggleMenu(false)}>Profile</MenuLink>
                    </>
                    : null
                    }
                </MenuContainer>
                {!(window.location.pathname.toString() === '/') ? 
                    <HomeName />
                : (!props.isLoggedIn) ? 
                    <NavButton link="/signup" onClick={() => props.setToggleMenu(false)}>Join</NavButton>
                : null}
            </nav>
        </NavContainer>
    )
}

export default Navigation;

const NavContainer = styled.header`
    height: 4rem;
    background-color: black;

    & nav {
        display: flex;
        justify-content: flex-end;
        height: 100%;
    }

`


const MenuContainer = styled.div`
    z-index: 10;
    height: 100vh;
    box-sizing: border-box;
    display: ${(props) => props.display ? 'flex' : 'none'};
    width: 16rem;
    position: absolute;
    left: 0;
    top: 0;
    background-color: black;
    flex-direction: column;
    padding: 0 1rem;

   
`

const MenuLink = styled(NavLink)`
    font-size: ${props => props.products ? '1.4rem' : '1.8rem'};
    box-sizing: border-box;
    margin-bottom: 1rem;
    width: 100%;
    text-align: left;
    text-decoration: none;
    color: white;
    transition: ease-in 0.5s;

    &.active {
        color: red;
        font-weight: bold;
    }

    &:hover {
        cursor: pointer;
        color: red;
    }
`

const MenuHashLink = styled(HashLink)`
    font-size: ${props => props.products ? '1.4rem' : '1.8rem'};
    box-sizing: border-box;
    margin-bottom: 1rem;
    width: 100%;
    text-align: left;
    text-decoration: none;
    color: white;
    transition: ease-in 0.5s;

    &.active {
        color: red;
        font-weight: bold;
    }

    &:hover {
        cursor: pointer;
        color: red;
    }
`