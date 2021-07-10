import React, {useState, useEffect}  from 'react'
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

import Input from './UI/Input';
import Button from './Buttons/Button';
import ErrorMessages from './UI/ErrorMessages';

const EditProductModal = (props) => {

    const [productId, setProductId] = useState(props.product.id);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [productTypeId, setProductTypeId] = useState(props.product.productTypeId);
    const [size, setSize] = useState(props.product.size);
    const [oldImage, setOldImage] = useState(props.product.image);
    const [newImage, setNewImage] = useState(null);
    const [description, setDescription] = useState(props.product.description);
    const [soldOut, setSoldOut] = useState(props.product.sold === 0 ? false : true);
    const [errorMessages, setErrorMessages] = useState([])
    const [redirectAfterCreation, setRedirectAfterCreation] = useState(false);

    const editProductHandler = () => {
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('productTypeId', productTypeId);
        formData.append('size', size);
        formData.append('oldImage', oldImage);
        // calling this just 'image' because that's what we named it for multer to access it
        formData.append('image', newImage);
        formData.append('description', description);
        formData.append('soldOut', soldOut);
        formData.append('productId', productId);
        formData.append('sellerId', props.seller.id);

        fetch('http://localhost:8080/user/edit-product', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(res => {
                // if user tries to edit product that is not theirs
                if (res.status === 401) {
                    return props.setError({
                        status: true,
                        message: 'You cannot edit other people\'s products!'
                    });
                } else {
                    res.json()
                        .then(resData => {
                            if (resData.errors.length > 0) {
                                return setErrorMessages(resData.errors);
                            }
                            return setRedirectAfterCreation(true);
                        });
                }
            })
            .catch(err => {
                // TODO
                console.log(err);
            })
        // cleanup: on unmount, return error state to false - is this how it works????
        return () => {
            props.setError({status: false, message: ''});
        }
    }

    const deleteProductHandler = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/user/delete-product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId,
                sellerId: props.seller.id
            })
        })
            .then(res => {
                if (res.status !== 200) {
                    props.setError({status: true, message: 'You cannot delete other people\'s products!'})
                } else {
                    setRedirectAfterCreation(true);
                }
            })
            .catch(err => {
                // TODO
                console.log(err);
                props.setError({status: true, message: 'You cannot delete other people\'s products!'})
            })  
        return () => {
            props.setError({status: false, message: ''})
        }
    }
    
        return (
            <EditModalContainer>
                <Button exit onClick={props.setEditMode}>X</Button>
                {errorMessages.length > 0 ? 
                    <ErrorMessages errorMessages={errorMessages} setErrorMessages={() => setErrorMessages()}/>
                 : null}
                <SoldOutContainer>
                    <label for="soldOut">Sold</label>
                    <input type="checkbox" name="soldOut" id="soldOut" value={soldOut} onChange={() => setSoldOut(!soldOut)} checked={soldOut ? true : false}/>
                </SoldOutContainer>
                <Input type="text" label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input type="number" step="0.01" label="Price" id="price" value={[price]}  onChange={(e) => setPrice(e.target.value)}/>
                <ProductTypesContainer>
                    <p>Type of Product</p>
                    {(props.productTypes.length < 1) ? <div>No product types yet</div> :
                    props.productTypes.map(pType => {
                        return (
                            <Input type="radio" label={pType.type} id={pType.id} name="productType" onChange={(e) => setProductTypeId(e.target.value)} checked={pType.id === productTypeId ? true : null}/>
                        )
                    })}
                </ProductTypesContainer>
                <Input type="text" label="Size" id="size" value={size} onChange={(e) => setSize(e.target.value)}/>
                <Input type="file" label="New Image" id="image" onChange={(e) => setNewImage(e.target.files[0])}/>
                <Input type="textarea" label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <ButtonsContainer>
                    <Button update onClick={() => editProductHandler()}>Update</Button>
                    <Button update delete onClick={() => deleteProductHandler()}>Delete</Button>
                </ButtonsContainer>
                    { redirectAfterCreation ? <Redirect to={`/${props.seller.username}/my-products`} /> : null}
            </EditModalContainer>
        )
}

export default EditProductModal;

const EditModalContainer = styled.div`
    width: 30rem;
    color: white;
    background: linear-gradient(to top, black 60%, gray);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 0.1rem outset gray;

    @media (max-width: 56.188rem) {
        margin: auto;
        width: 40rem;
    }
`


const ProductTypesContainer = styled.div`
    width: 24rem;
    margin: auto;

    & p {
        text-align: left;
        margin: 0;
        padding: 1rem 0 0.5rem 0;
    }
`

const SoldOutContainer = styled.div`
    width: 24rem;
    display: flex;
    margin: auto;
    align-content: flex-start;
    flex-direction: row;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 28rem;
    margin: auto;
    padding: 0;
`
