import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

import ProductCard from '../../components/ProductCard';
import Error from '../UI/error';

const MyOrders = (props) => {
    // called "requestedName" because user may not exist
    // (such as typing in a random string in the username field in the url)
    const {requestedName} = useParams();

    const [orders, setOrders] = useState([]);
    const [profileName, setProfileName] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8080/user/${requestedName}/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,

            }
        })
            .then(res => {
                if (res.status === 404) {
                    return props.setError({status: true, message: "This user does not exist, thus has no orders."});
                }
                if (res.status === 401) {
                    return props.setError({status: true, message: "You cannot view other people's orders!"})
                }
                if (res.status !== 200) {
                    return props.setError({status: true, message: "Something went wrong - failed to fetch orders."});
                }
                res.json()
                    .then(resData => {
                        setOrders(JSON.parse(resData.orders));
                        return setProfileName(JSON.parse(resData.profileName));
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: "Something went wrong - failed to fetch orders."});
            })
        return () => {
            props.setError({status: false, message: ''});
        }
    }, [])
    
    if (!props.error.status) {
        return (
            <>
                <h2>{profileName}'s Orders</h2>
                <ProductsContainer>
                    {orders.length < 1 ? <p>No orders yet!</p> :
                    orders.map(order => {
                        return <ProductCard product={order} order />
                    })}
                </ProductsContainer>
            </>
        );
    } else {
        return <Error message={props.error.message} />
    }
}

export default MyOrders;


/* should figure out how to factor these out into another file to re-use in other components*/

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
