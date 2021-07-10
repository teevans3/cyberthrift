import React from 'react'
import styled from 'styled-components';

const Header = (props) => {
    return (
        <HeaderContainer main={props.main} >{props.children}</HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    font-size: ${props => props.main ? '2em' : '1.2em'};
    padding: ${props => props.main ? '2rem 0' : '2rem 1rem 1rem 0'};
    text-align: ${props => props.main ? 'center' : 'left'};
    border-bottom: ${props => props.main ? 'none' : '0.031rem solid gray'};
    margin-bottom: ${props => props.main ? 'auto' : '0.969rem'}

    @media (max-width: 1400px) {
        text-align: center !important;
    }
`