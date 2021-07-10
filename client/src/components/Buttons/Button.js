import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components'

const Button = (props) => {
    if (props.buy) {
        return (
            <BuyButton to={props.linkUrl}>{props.children}</BuyButton>
        )
    }
    if (props.checkout) {
        return (
            <CheckoutButton onClick={() => props.onClick()}>{props.children}</CheckoutButton>
        )
    }
    if (props.edit) {
        return (
            <EditButton onClick={() => props.onClick()}>{props.children}</EditButton>
        )
    }
    if (props.auth) {
        return (
            <AuthButton onClick={() => props.onClick()}>{props.children}</AuthButton>
        )
    }
    if (props.add) {
        return (
            <AddProductButton to={props.linkUrl}>{props.children}</AddProductButton>
        )
    }
    if (props.create) {
        return (
            <CreateProductButton onClick={() => props.onClick()}>{props.children}</CreateProductButton>
        )
    }
    if (props.update) {
        return (
            <UpdateProductButton delete={props.delete} onClick={() => props.onClick()}>{props.children}</UpdateProductButton>
        )
    }
    if (props.exit) {
        return (
            <ExitButton onClick={() => props.onClick()}>X</ExitButton>
        )
    }

}

export default Button;

const BuyButton = styled(Link)`
    background-color: #014421;
    height: 2.6rem;
    width: 100%;
    border-radius: 0.2rem;
    border: none;
    box-sizing: border-box;
    color: #90ee90;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    padding-top: 0.7rem;

    &:hover {
        padding-top: 0.6rem;
        cursor: pointer;
        border: 0.1rem solid #90ee90;
    }
`

const CheckoutButton = styled.button`
    width: 24rem;
    background-color: ${props => props.children === 'Delete' ? '#8b0000' : '#00008b'};
    height: 2.6rem;
    border: none;
    border-radius: 0.2rem;
    box-sizing: border-box;
    color: white;
    font-size: 1rem;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        border: ${props => props.children === 'Delete' ? '1px solid #f20000' : '1px solid cyan'};
    }
`

const EditButton = styled.button`
    width: 24rem;
    background-color: #00008b;
    height: 2.6rem;
    border: none;
    border-radius: 0.2rem;
    box-sizing: border-box;
    color: white;
    font-size: 1rem;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        border: 1px solid cyan;
    }
`

const AuthButton = styled.button`
    width: 24rem;
    background-color: #474747;
    height: 2.6rem;
    border: none;
    border-radius: 0.2rem;
    box-sizing: border-box;
    color: white;
    font-size: 1rem;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        border: 1px solid white;
    }
`

const AddProductButton = styled(Link)`
    background-color: #014421;
    height: 2.6rem;
    width: 24rem;
    margin: auto;
    border-radius: 0.2rem;
    border: none;
    box-sizing: border-box;
    color: #90ee90;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    padding-top: 0.7rem;

    &:hover {
        padding-top: 0.6rem;
        cursor: pointer;
        border: 0.1rem solid #90ee90;
    }
`

const CreateProductButton = styled.button`
    width: 24rem;
    background-color: #014421;
    height: 2.6rem;
    border: none;
    border-radius: 0.2rem;
    box-sizing: border-box;
    color: #90ee90;
    font-size: 1rem;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        border: 0.1rem solid #90ee90;
    }
`

const UpdateProductButton = styled.button`
    width: ${props => props.delete ? '20%' : '50%'};
    background-color: ${props => props.delete ? '#8b0000' : '#00008b'};
    height: 2.6rem;
    border: none;
    border-radius: 0.2rem;
    box-sizing: border-box;
    color: white;
    font-size: 1rem;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        border: ${props => props.delete ? '1px solid red' : '1px solid cyan'};
    }
`



const ExitButton = styled.button`
    height: 2rem;
    width: 2rem;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
    }
`
