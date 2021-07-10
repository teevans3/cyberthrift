import React from 'react'
import styled from 'styled-components';

const ProductInfoName = (props) => {
    return (
        <ProductName>{props.children}</ProductName>
    )
}

export default ProductInfoName;

const ProductName = styled.p`
    font-size: 2rem;
    margin: 0 0 2rem 0;

    @media (max-width: 56.188rem) {
        margin-top: 2rem;
        text-align: center;
    }
`