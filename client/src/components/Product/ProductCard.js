import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import SoldOut from '../UI/SoldOut';

const ProductCard = (props) => {
    return (
        <ProductLink to={`/${props.product.productTypeName}/${props.product.id}`}>
            <ProductCardContainer>
                <ProductImage style={{backgroundImage: `url('http://localhost:8080/${props.product.image}')` }} />
                <ProductName>{props.product.name}</ProductName>
                {/* if it is an order card, we don't need the following info */}
                {!props.order ? 
                    <>
                        {
                            props.product.sold ?
                            <SoldOut/> :
                            <ProductPriceSize>${props.product.price} | {props.product.size}</ProductPriceSize>
                        }
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
    width: 10.5rem;
    margin: 1rem;
    height: auto;

    & p {
        text-decoration: none;
        margin: 0;
        color: white;
    }

    @media (max-width: 30rem) {
        margin: 1rem 0;
        width: 20rem;

        & p {
            text-align: center;
        }
    }


`

// will need to adjust the height on this one...
const ProductImage = styled.div`
    width: 100%;
    height: 10.5rem;
    background-size: cover;
    background-position: center;

       
    @media (max-width: 30rem) {
        height: 20rem;
    }
 
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
    padding: 0 0 0.5rem 0;
`