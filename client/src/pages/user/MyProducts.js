import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/UI/Header';
import PageWrapper from '../../components/Layout/PageWrapper';
import ProductCard from '../../components/Product/ProductCard';
import Error from '../UI/error';

const MyProducts = (props) => {

    // called "requestedName" because user may not exist
    // (such as typing in a random string in the username field in the url)
    const {requestedName} = useParams();

    const [products, setProducts] = useState([]);
    const [profileName, setProfileName] = useState('');

    // retrieve products from database
    useEffect(() => {
        fetch(`http://localhost:8080/user/${requestedName}/my-products`)
            .then(res => {
                if (res.status === 404) {
                    return props.setError({status: true, message: 'This user does not exist, thus has no products.'})
                }
                if (res.status !== 200) {
                    return props.setError({status: true, message: 'Something went wrong - failed to fetch products.'})
                }
                res.json()
                    .then(resData => {
                        setProducts(JSON.parse(resData.products));
                        return setProfileName(JSON.parse(resData.profileName));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - failed to fetch products.'})
            })
        return () => {
            props.setError({status: false, message: ''})
        }
    }, [])

    if (!props.error.status) {
        return (
            <PageWrapper>
                <Header>{profileName}'s Products</Header>
                <ProductsContainer>
                    {/* need to add a loader/spinner */}
                    {(products.length < 1) ? <div>This user has no products yet.</div> :
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

export default MyProducts;

/* should figure out how to factor these out into another file to re-use in other components*/

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`