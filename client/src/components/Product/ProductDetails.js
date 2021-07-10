import React from 'react'
import styled from 'styled-components';

const ProductDetails = (props) => {
    return (
        <ProductDetailsContainer>{props.children}</ProductDetailsContainer>
    )
}

export default ProductDetails;

const ProductDetailsContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 30rem;
    text-align: left;
    padding: 0 3rem;
    flex-wrap: wrap;


    @media (max-width: 56.188rem) {
        margin: auto;
        width: 40rem;
    }
`