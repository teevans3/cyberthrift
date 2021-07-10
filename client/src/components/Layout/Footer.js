import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterContainer>
            <CopyRight>CyberThrift © 2021</CopyRight>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.footer`
    background-color: #202020;
    width: 100%;
    height: 5rem;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
`

const CopyRight = styled.span`
    color: white;
    align-self: center;
    padding-right: 1rem;
`