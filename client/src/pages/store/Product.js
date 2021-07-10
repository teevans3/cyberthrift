import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

import PageWrapper from '../../components/Layout/PageWrapper';
import ProductContainer from '../../components/Product/ProductContainer';
import ProductImage from '../../components/Product/ProductImage';
import ProductInfo from '../../components/Product/ProductInfo';
import ProductInfoTitle from '../../components/Product/ProductInfoTitle';
import ProductDetails from '../../components/Product/ProductDetails';
import ProductInfoName from '../../components/Product/ProductInfoName';
import EditProductModal from '../../components/EditProductModal';
import SoldOut from '../../components/UI/SoldOut';
import Button from '../../components/Buttons/Button';
import Error from '../UI/error';
 
const Product = (props) => {
    const {productId, productTypeName} = useParams();

    const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});
    const [productTypes, setProductTypes] = useState([])
    const [isMyProduct, setIsMyProduct] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/store/${productTypeName}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 404) {
                    return props.setError({status: true, message: 'This product does not exist.'})
                }
                if (res.status === 401) {
                    return props.setError({status: true, type: 'authorization', message: 'You must be logged in to view this product.'})
                }
                res.json()
                    .then(resData => {
                        setSeller(JSON.parse(resData.seller));
                        setProductTypes(JSON.parse(resData.productTypes));
                        // if user is viewing their own product...
                        if (resData.username === JSON.parse(resData.seller).username) {
                            setIsMyProduct(true);
                        }
                        return setProduct(JSON.parse(resData.product));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - failed to fetch product.'});
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, type: '', message: ''});
        }
    }, [])


    if (!props.error.status) {
    return (
        <PageWrapper>
        <ProductContainer>
            <ProductImage backgroundImage={`url('http://localhost:8080/${product.image}')`}/>
            {editMode ?
                <EditProductModal product={product} productTypes={productTypes} seller={seller} error={props.error} setError={props.setError} setEditMode={() => setEditMode(!editMode)}/>
                :
                <ProductDetails>
                    <ProductInfoName>{product.name}</ProductInfoName>
                    {
                        product.sold ?
                            <SoldOut/> 
                            : null
                    }
                    <ProductInfoTitle>Price</ProductInfoTitle>
                    <ProductInfo>${product.price}</ProductInfo>
                    <ProductInfoTitle>Size</ProductInfoTitle>
                    <ProductInfo>{product.size}</ProductInfo>
                    <ProductInfoTitle description>Description</ProductInfoTitle>
                    <ProductInfo description>{product.description}</ProductInfo>
                    {
                        !isMyProduct ?
                        <>
                            <ProductInfoTitle>Seller</ProductInfoTitle>
                            <ProductInfo><Link to={`/${seller.username}/profile`}>{seller.username}</Link></ProductInfo>
                        </>
                        :
                        <Button edit onClick={() => setEditMode(!editMode)}>Edit</Button>
                    }
                    {
                        !product.sold && !isMyProduct ?
                        <Button linkUrl={`/${productTypeName}/${productId}/checkout`} buy>Buy Now</Button>
                        :
                        null
                    }
                </ProductDetails>
            }
        </ProductContainer>
        </PageWrapper>
    )
    } else {
        return <Error message={props.error.message} type={props.error.type}/>
    } 

}

export default Product;

