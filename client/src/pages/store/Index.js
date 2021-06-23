import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import ProductCard from '../../components/ProductCard';
import Error from '../UI/error';

const Index = (props) => {

    const [products, setProducts] = useState([]);

    // retrieve products from database
    useEffect(() => {
        fetch('http://localhost:8080/store/')
            .then(res => {
                return res.json()
            })
            .then(resData => {
                return setProducts(JSON.parse(resData.products));
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: "Something went wrong - failed to fetch products."})
            })
        return () => {
            props.setError({status: false, message: ''})
        }
    }, [])

    if (!props.error.status) {
        return (
            <div>
                <h2>Index Page</h2>
                <ProductsContainer>
                    {/* need to add a loader/spinner */}
                    {(products.length < 1) ? <div>No products</div> :
                    products.map(product => {
                        return <ProductCard product={product} />
                    })}
                </ProductsContainer>
            </div>
        )
    } else {
        return <Error message={props.error.message} />
    }
}

export default Index;

/* should figure out how to factor these out into another file to re-use in other components*/

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`