import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import PageWrapper from '../../components/Layout/PageWrapper';
import HomeName from '../../components/UI/HomeName';
import HomePageImage from '../../images/homepage.jpg';
import About from '../../components/About';
import Header from '../../components/UI/Header';
import ProductCard from '../../components/Product/ProductCard';
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
                <HomeImage>
                    <HomeName main/>
                </HomeImage>
                <PageWrapper home>
                    <About/>
                    <Header>Recently Added</Header>
                    <ProductsContainer>
                        {/* need to add a loader/spinner */}
                        {(products.length < 1) ? <div>No products</div> :
                        products.map(product => {
                            return <ProductCard product={product} />
                        })}
                    </ProductsContainer>
                </PageWrapper>
            </div>
        )
    } else {
        return <Error message={props.error.message} />
    }
}

export default Index;

/* should figure out how to factor these out into another file to re-use in other components*/

const HomeImage = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    top: -4rem;
    left: 0;
    background: black url(${HomePageImage});
    margin-bottom: 1rem;
`

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 87.4rem) {
        justify-content: center;
    }

    @media(max-width: 30rem) {
        flex-direction: column;
        width: 20rem;
        margin: auto;
    }
`