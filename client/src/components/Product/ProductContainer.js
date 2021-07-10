import React from 'react'
import styled from 'styled-components';

const ProductContainer = (props) => {
    return (
        <ProductContainerDiv>{props.children}</ProductContainerDiv>
    )
}

export default ProductContainer;

const ProductContainerDiv = styled.div`
    padding: 2rem 0;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;

    @media (max-width: 56.188rem) {
        text-align: center;
    }
`