import React from 'react'
import styled from 'styled-components'

const Layout = (props) =>  {
    return (
        <LayoutContainer>
            {props.children}
        </LayoutContainer>
    )
}

export default Layout;

const LayoutContainer = styled.div`
    max-width: 1400px;
    margin: auto;
    min-height: calc(100vh - 3rem);
`