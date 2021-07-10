import React from 'react'
import styled from 'styled-components'

import Footer from './Footer';

const Layout = (props) =>  {
    return (
        <LayoutContainer>
            <LayoutContent>
                {props.children}
            </LayoutContent>
            <Footer />
        </LayoutContainer>
    )
}

export default Layout;

const LayoutContainer = styled.div`
    margin: auto;
    min-height: calc(100vh - 3rem);
    color: white;
    background-color: black;
`

const LayoutContent = styled.div`
    min-height: calc(100vh - 8rem);
`