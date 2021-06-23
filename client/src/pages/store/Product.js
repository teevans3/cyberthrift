import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

import ProductImage from '../../components/ProductImage';
import EditProductModal from '../../components/EditProductModal';
import Button from '../../components/Button';
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
                    return props.setError({status: true, message: 'You must be logged in to view this product.'})
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
            props.setError({status: false, message: ''});
        }
    }, [])


    if (!props.error.status) {
    return (
        <ProductContainer>
            <ProductImage backgroundImage={`url('http://localhost:8080/${product.image}')`}/>
            {editMode ?
                <EditProductModal product={product} productTypes={productTypes} seller={seller} error={props.error} setError={props.setError} setEditMode={() => setEditMode(!editMode)}/>
                :
                <ProductDetails>
                    <ProductName>{product.name}</ProductName>
                    <ProductInfo>${product.price}</ProductInfo>
                    <ProductInfo>Seller: <Link to={`/${seller.username}/profile`}>{seller.username}</Link></ProductInfo>
                    <ProductInfo>Size: {product.size}</ProductInfo>
                    <ProductInfo>Description: {product.description}</ProductInfo>
                    {
                        product.sold ?
                            <Button sold>SOLD OUT</Button> 
                            : null
                    }
                    {
                        !product.sold && !isMyProduct ?
                        <Button linkUrl={`/${productTypeName}/${productId}/checkout`} link>BUY NOW</Button>
                        : null
                    }
                    {isMyProduct ? <Button clickButton={() => setEditMode(!editMode)}>EDIT</Button> : null }
                </ProductDetails>
            }
        </ProductContainer>
    )
    } else {
        return <Error message={props.error.message}/>
    } 

}

export default Product;

const ProductContainer = styled.div`
    padding: 3rem 0;
    height: auto;
    display: flex;
    justify-content: center;
`

const ProductDetails = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 30rem;
    text-align: left;
    padding: 0 2rem;
    & p {
        margin: 1rem 0;
    }
`

const ProductName = styled.p`
    font-size: 2rem;
`

const ProductInfo = styled.p`
    font-size: 1rem;
`