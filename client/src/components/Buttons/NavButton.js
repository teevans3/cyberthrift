import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavButton = (props) => {
    if (props.link) {
        return (
            <NavButtonLink to={props.link}>{props.children}</NavButtonLink>
        )
    }
    return (
        <NavButtonButton close={props.close} home={props.home} onClick={props.onClick}>{props.children}</NavButtonButton>

    )    
}

export default NavButton;


const NavButtonLink = styled(Link)`
    z-index: 10;
    background-color: black;
    border-radius: 12px;
    height: 2.6rem;
    color: white;
    box-sizing: border-box;
    line-height: 40px;
    margin: 2rem;
    width: 6rem;
    text-decoration: none;

    &:hover {
        background-color: #3d3d3d;
        cursor: pointer;
    }
`

const NavButtonButton = styled.button`
    font-size: ${props => props.close ? '1rem' : '1.4rem;'};
    z-index: 9;
    background: none;
    height: 2.6rem;
    color: ${props => props.close ? 'gray' : props.home ? 'black' : 'red'};
    box-sizing: border-box;
    border: none;
    position: relative;
    margin: ${props => props.close ? '0 0 0 auto;' : '1rem auto 0 1rem;'}

    &:hover {
        cursor: pointer;
    }

`