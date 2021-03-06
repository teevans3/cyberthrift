import React from 'react';
import styled from 'styled-components'

const ProductImage = (props) => {
    return <ProductImageContainer style={{backgroundImage: props.backgroundImage}}></ProductImageContainer>
}

export default ProductImage;

const ProductImageContainer = styled.div`
    box-sizing: border-box;
    width: 40rem;
    height: 40rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: 56.188rem) {
        margin: auto;
    }
`