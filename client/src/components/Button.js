import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components'

const Button = (props) => {
    if (props.exit) {
        return (
            <StyledExitButton onClick={() => props.onClick()}>X</StyledExitButton>
        )
    }
    if (props.default) {
        return (
            <StyledDefaultButton onClick={() => props.onClick()}>{props.children}</StyledDefaultButton>
        )
    }
    if (props.link) {
        return (
            <StyledLink to={props.linkUrl}>{props.children}</StyledLink>
            )
    } else {
        return (
            <StyledProductButton sold={props.solds} onClick={props.sold ? null : () => props.clickButton()}>{props.children}</StyledProductButton>
        )
    }  
}

export default Button;

const StyledExitButton = styled.button`
    height: 2rem;
    width: 2rem;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
    }
`

const StyledDefaultButton = styled.button`
    background-color: ${props => props.children === 'Delete' ? '#8b0000' : '#00008b'};
    height: 2.4rem;
    width: ${props => props.children === 'Delete' ? '6rem' : '14rem'};
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    color: ${props => props.children === 'Delete' ? '#f20000' : 'white'};
    font-size: 1rem;
    margin: 2rem auto;
    &:hover {
        cursor: pointer;
        border: ${props => props.children === 'Delete' ? '1px solid #f20000' : '1px solid cyan'};
    }
`

const StyledProductButton = styled.button`
    background-color: ${props => props.sold ? '#8b0000': '#00008b'};
    height: 2rem;
    width: 10rem;
    border-radius: 25px;
    border: none;
    box-sizing: border-box;
    color: ${props => props.sold ? '#f20000' : '#00ffff'};
    font-size: 1rem;

    &:hover {
        cursor: ${props => props.sold ? 'default' : 'pointer'};
        border: ${props => props.sold ? '#f20000' : '#00ffff'};
    }
`

const StyledLink = styled(Link)`
    background-color: #014421;
    height: 2rem;
    width: 10rem;
    border-radius: 25px;
    border: none;
    box-sizing: border-box;
    color: #90ee90;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    padding-top: 6px;

    &:hover {
        padding-top: 4px;
        cursor: pointer;
        border: 2px solid #90ee90;
    }
`

