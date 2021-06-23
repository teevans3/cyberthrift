import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = (props) => {
    return (
        <ProductLink to={`/${props.product.productTypeName}/${props.product.id}`}>
            <ProductCardContainer>
                <ProductImage style={{backgroundImage: `url('http://localhost:8080/${props.product.image}')` }} />
                <ProductName>{props.product.name}</ProductName>
                <ProductPriceSize>${props.product.price} | {props.product.size}</ProductPriceSize>
                {/* if it is an order card, we don't need the following info */}
                {!props.order ? 
                    <>
                        {props.product.sold ? <p>SOLD OUT</p> : null}
                    </> : null
                }

            </ProductCardContainer>
        </ProductLink>
    )
}

export default ProductCard;

const ProductLink = styled(Link)`
    text-decoration: none;
`

const ProductCardContainer = styled.div`
    width: 10rem;
    margin: 1rem;
    height: auto;
    & p {
        text-decoration: none;
        margin: 0;
        color: black;
    }
`

// will need to adjust the height on this one...
const ProductImage = styled.div`
    width: 100%;
    height: 10rem;
    background-size: cover;
    background-position: center;
`

const ProductName = styled.p`
    font-size: 1.4rem;
    text-align: left;
    text-decoration: none !important;
    margin: 0;
    padding: 0.5rem 0;
`

const ProductPriceSize = styled.p`
    text-decoration: none;
`