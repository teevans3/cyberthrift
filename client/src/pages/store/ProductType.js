import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import PageWrapper from '../../components/Layout/PageWrapper';
import Header from '../../components/UI/Header';
import ProductCard from '../../components/Product/ProductCard';
import Error from '../UI/error';

const ProductType = (props) => {
    const [productTypeName, setProductTypeName] = useState(props.match.params.productTypeName)
    const [products, setProducts] = useState([]);

    // retrieve products from database
    useEffect(() => {
        setProductTypeName(props.match.params.productTypeName)
        fetch(`http://localhost:8080/store/${props.match.params.productTypeName}`)
            .then(res => {
                if (res.status === 404) {
                    return props.setError({status: true, message: 'This is not a valid product type.'})
                }
                res.json()
                    .then(resData => {
                        return setProducts(JSON.parse(resData.products));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: `Something went wrong - failed to fetch ${props.match.params.productTypeName}.`})
            })
        return () => {
            props.setError({status: false, message: ''})
        }
    }, [props.match.params.productTypeName])
    
    if (!props.error.status) {
        return (
            <PageWrapper>
                <Header>{productTypeName.charAt(0).toUpperCase() + productTypeName.slice(1)}</Header>
                <ProductsContainer>
                    {/* need to add a loader/spinner */}
                    {(products.length < 1) ? <div>No products yet</div> :
                    products.map(product => {
                        return <ProductCard product={product} />
                    })}
                </ProductsContainer>
            </PageWrapper>
        )
    } else {
        return <Error message={props.error.message} />
    }

}

export default ProductType;


const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
    box-sizing: border-box;

`
