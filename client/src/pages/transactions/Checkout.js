import React, {useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom';
import styled from 'styled-components'

import ProductImage from '../../components/ProductImage';
import Button from '../../components/Button';
import Input from '../../components/Input';
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
                    return props.setError({status: true, message: 'You must be logged in to buy this product.'});
                }
                if (res.status !== 200) {
                    return props.setError({status: true, message: 'Something went wrong - try buying this product again, later.'});
                }
                res.json()
                    .then(resData => {
                        return setProductInfo(JSON.parse(resData.product));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - try buying this product again, later.'});
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, message: ''});
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
                    return props.setError({status: true, message: 'You must be logged in to buy this product.'});
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
            props.setError({status: false, message: ''});
        }
    }

    if (!props.error.status) {
        return (
            <CheckoutContainer>
                <h2>Check Out</h2>
                <ProductImage backgroundImage={`url('http://localhost:8080/${productInfo.image}')`} />
                {errorMessages.length > 0 ? 
                <ul>
                    {errorMessages.map(message => {
                        return (<li>{message}</li>)
                    })}
                </ul> : null}
                <div>
                    <p>Item: {productInfo.name}</p>
                    <p>Seller: {productInfo.sellerId}</p>
                    <p>Product Type: {productInfo.productTypeId}</p>
                    <p>Image: {productInfo.image}</p>
                    <p>Price: ${productInfo.price}</p>
                <p>Item Size: {productInfo.size}</p>
                </div>
                {productInfo.sold ?
                    <p>SOLD OUT</p> : 
                    <div>
                        <Input type="text" label="Card Number" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)}/>
                        {/* <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)} /> */}
                        <Input type="text" label="Expiration Date (format: MMYY" id="cardExpiration" onChange={(e) => setCardExpiration(e.target.value)}/>
                        {/* <label for="cardExpiration">Expiration Date (format: MMYY)</label>
                        <input type="text" id="cardExpiration" min="4" max="4" onChange={(e) => setCardExpiration(e.target.value)} /> */}
                        <Input type="text" label="SVC Number" id="svcNumber" onChange={(e) => setSvcNumber(e.target.value)}/>
                        {/* <label for="svcNumber">SVC Number</label>
                        <input type="text" id="svcNumber" min="3" max="3" onChange={(e) => setSvcNumber(e.target.value)} /> */}
                        <Button default onClick={() => checkoutHandler()}>Check Out</Button>
                    </div> 
                }
                
                {redirectAfterCheckout ? <Redirect to={{ pathname: '/thank-you', state: {productInfo: productInfo} }} /> : null}
            </CheckoutContainer>
        )
    } else {
        return <Error message={props.error.message} />
    }
}

export default Checkout;

const CheckoutContainer = styled.div`
    padding: 3rem 0;
    margin: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`