import React, {useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom';

import Header from '../../components/UI/Header';
import Divider from '../../components/UI/Divider';
import ProductContainer from '../../components/Product/ProductContainer';
import ProductDetails from '../../components/Product/ProductDetails';
import ProductImage from '../../components/Product/ProductImage';
import ProductInfo from '../../components/Product/ProductInfo';
import ProductInfoTitle from '../../components/Product/ProductInfoTitle';
import ProductInfoName from '../../components/Product/ProductInfoName';
import Button from '../../components/Buttons/Button';
import SoldOut from '../../components/UI/SoldOut';
import Input from '../../components/UI/Input';
import Error from '../UI/error';

const Checkout = (props) => {
    const {productId, productTypeName} = useParams();

    const [productInfo, setProductInfo] = useState({});
    const [cardNumber, setCardNumber] = useState(null)
    const [cardExpiration, setCardExpiration] = useState(null);
    const [svcNumber, setSvcNumber] = useState(null);
    const [errorMessages, setErrorMessages] = useState([])
    const [redirectAfterCheckout, setRedirectAfterCheckout] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/${productTypeName}/${productId}/checkout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 404) {
                    return props.setError({status: true, message: 'You cannot buy this product, it does not exist!'});
                }
                if (res.status === 401) {
                    return props.setError({status: true, type: 'authorization', message: 'You must be logged in to buy this product.'});
                }
                if (res.status !== 200) {
                    return props.setError({status: true, message: 'Something went wrong - try buying this product again, later.'});
                }
                res.json()
                    .then(resData => {
                        if (JSON.parse(resData.product).sold) {
                            return props.setError({status: true, message: 'This product has already been purchased.'})
                        }
                        return setProductInfo(JSON.parse(resData.product));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - try buying this product again, later.'});
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, type: '', message: ''});
        }
    }, [])

    const checkoutHandler = () => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/${productTypeName}/${productId}/checkout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                buyer: localStorage.getItem('userId'),
                productId: productInfo.id,
                sellerId: productInfo.sellerId,
                cardNumber: cardNumber,
                cardExpiration: cardExpiration,
                svcNumber: svcNumber
            })
        })
            .then(res => {
                if (res.status === 401) {
                    return props.setError({status: true, type: 'authorization', message: 'You must be logged in to buy this product.'});
                }
                res.json()
                    .then(resData => {
                        if (resData.errors.length > 0) {
                            return setErrorMessages(resData.errors);
                        }
                        return setRedirectAfterCheckout(true);
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - try buying this product again, later.'});
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, type: '', message: ''});
        }
    }

    if (!props.error.status) {
        return (
            <>
            <Header main>Check Out</Header>
            <ProductContainer>
                {errorMessages.length > 0 ? 
                <ul>
                    {errorMessages.map(message => {
                        return (<li>{message}</li>)
                    })}
                </ul> : null}
                <ProductImage backgroundImage={`url('http://localhost:8080/${productInfo.image}')`} />
                <ProductDetails>
                    {productInfo.sold ?
                        <SoldOut /> : 
                        <>
                            <ProductInfoName>{productInfo.name}</ProductInfoName>
                            <ProductInfoTitle>Price</ProductInfoTitle>
                            <ProductInfo>${productInfo.price}</ProductInfo>
                            <ProductInfoTitle>Size</ProductInfoTitle>
                            <ProductInfo>{productInfo.size}</ProductInfo>
                            <Divider />
                            <Input type="text" label="Card Number" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)}/>
                            {/* <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)} /> */}
                            <Input type="text" label="Expiration Date (format: MMYY" id="cardExpiration" onChange={(e) => setCardExpiration(e.target.value)}/>
                            {/* <label for="cardExpiration">Expiration Date (format: MMYY)</label>
                            <input type="text" id="cardExpiration" min="4" max="4" onChange={(e) => setCardExpiration(e.target.value)} /> */}
                            <Input type="text" label="SVC Number" id="svcNumber" onChange={(e) => setSvcNumber(e.target.value)}/>
                            {/* <label for="svcNumber">SVC Number</label>
                            <input type="text" id="svcNumber" min="3" max="3" onChange={(e) => setSvcNumber(e.target.value)} /> */}
                            <Button checkout onClick={() => checkoutHandler()}>Check Out</Button>
                        </> 
                    }
                </ProductDetails>
                {redirectAfterCheckout ? <Redirect to={{ pathname: '/thank-you', state: {productInfo: productInfo} }} /> : null}
            </ProductContainer>
            </>
        )
    } else {
        return <Error message={props.error.message} type={props.error.type} />
    }
}

export default Checkout;
