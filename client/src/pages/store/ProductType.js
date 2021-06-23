import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import ProductCard from '../../components/ProductCard';
import Error from '../UI/error';

const ProductType = (props) => {
    const [productTypeName, setProductTypeName] = useState(props.match.params.productTypeName)
    const [products, setProducts] = useState([]);

    // retrieve products from database
    useEffect(() => {
        setProductTypeName(productTypeName)
        fetch(`http://localhost:8080/store/${productTypeName}`)
            .then(res => {
                return res.json()
            })
            .then(resData => {
                return setProducts(JSON.parse(resData.products));
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: `Something went wrong - failed to fetch ${props.match.params.productTypeName}.`})
            })
        return () => {
            props.setError({status: false, message: ''})
        }
    }, [productTypeName])
    
    if (!props.error.status) {
        return (
            <>
                <h2>{productTypeName}</h2>
                <ProductsContainer>
                    {/* need to add a loader/spinner */}
                    {(products.length < 1) ? <div>No products yet</div> :
                    products.map(product => {
                        return <ProductCard product={product} />
                    })}
                </ProductsContainer>
            </>
        )
    } else {
        return <Error message={props.error.message} />
    }

}

export default ProductType;


const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
