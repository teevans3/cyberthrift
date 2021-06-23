import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Error from '../UI/error';

const CreateProduct = (props) => {

    const [productTypes, setProductTypes] = useState([]);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [productTypeId, setProductTypeId] = useState(null);
    const [size, setSize] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [seller, setSeller] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);
    const [redirectAfterCreation, setRedirectAfterCreation] = useState(false);

    const token = localStorage.getItem('token');

    // make sure user is logged in, then retrieve product types from database
    useEffect(() => {
        fetch(`http://localhost:8080/user/create-product`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    return props.setError({status: true, message: 'You must be logged in to create a product.'});
                }
                if (res.status !== 200) {
                    return props.setError({status: true, message: 'Something went wrong - try creating a product again, later.'});
                }
                res.json()
                    .then(resData => {
                        return setProductTypes(JSON.parse(resData.productTypes));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - try creating a product again, later.'});  
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, message: ''});
        }
    }, [])

    const addProductHandler = () => {
        let inputErrors = false;

        const formData = new FormData();
        formData.append('name', JSON.stringify(name));
        formData.append('price', JSON.stringify(price));
        formData.append('productTypeId', JSON.stringify(productTypeId));
        formData.append('size', JSON.stringify(size));
        formData.append('image', image);
        formData.append('description', JSON.stringify(description));

        fetch('http://localhost:8080/user/create-product', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(res => {
                if (res.status !== 201) {
                    props.setError({status: true, message: 'Something went wrong - try creating a product again, later.'});
                }
                return res.json();
            })
            .then(resData => {
                if (resData.errors.length > 0) {
                    inputErrors = true;
                    return setErrorMessages(resData.errors);
                } 
                return setSeller(resData.sellerName);
            })
            .then(() => {
                if (!inputErrors) {
                    setRedirectAfterCreation(true);
                }
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'You must be logged in to create a product.'});
            })    
        return () => {
            props.setError({status: false, message: ''});
        }
    }

    if (!props.error.status) {
        return (
            <div>
            <h2>Create New Product</h2>
                {errorMessages.length > 0 ? 
                <ul>
                    {errorMessages.map(message => {
                        return (<li>{message}</li>)
                    })}
                </ul> : null}
                <Input type="text" label="Name" id="name" onChange={(e) => setName(e.target.value)}/>
                <Input type="number" label="Price" id="price" step="0.01" onChange={(e) => setPrice(e.target.value)}/>
                <ProductTypesContainer>
                    <p>Type of Product</p>
                    {(productTypes.length < 1) ? <div>No product types yet</div> :
                    productTypes.map(pType => {
                        return (
                            <Input type="radio" label={pType.type} id={pType.id} name="productType" onChange={(e) => setProductTypeId(e.target.value)}/>
                        )
                    })}
                </ProductTypesContainer>
                <Input type="text" label="Size" id="size" onChange={(e) => setSize(e.target.value)}/>
                <Input type="file" label="Image" id="image" onChange={(e) => setImage(e.target.files[0])}/>
                <Input type="textarea" label="Description" id="description" onChange={(e) => setDescription(e.target.value)}/>
                <Button default onClick={() => addProductHandler()}>Create</Button>
                { redirectAfterCreation ? <Redirect to={`${seller}/my-products`} /> : null}
            </div>
        )
    } else {
        return <Error message={props.error.message}/>
    }
}

export default CreateProduct;

const ProductTypesContainer = styled.div`
    width: 24rem;
    margin: auto;

    & p {
        text-align: left;
        margin: 0;
        padding: 1rem 0 0.5rem 0;
    }
`