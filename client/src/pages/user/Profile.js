import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

import PageWrapper from '../../components/Layout/PageWrapper';
import Header from '../../components/UI/Header';
import Button from '../../components/Buttons/Button';
import ProductCard from '../../components/Product/ProductCard';
import EmptyProducts from '../../components/UI/EmptyProducts';
import Error from '../UI/error';


const Profile = (props) => {
    // called "requestedName" because user may not exist
    // (such as typing in a random string in the username field in the url)
    const {requestedName} = useParams();

    const [profileName, setProfileName] = useState('')
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [profileProducts, setProfileProducts] = useState([]);
    const [profileOrders, setProfileOrders] = useState([]);
    const [moreProducts, setMoreProducts] = useState(false);
    const [moreOrders, setMoreOrders] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/user/${requestedName}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // if user does not exist
                if (res.status === 404) {
                    return props.setError({
                        status: true,
                        message: 'This user does not exist.'
                    });
                }
                if (res.status !== 200) {
                    return props.setError({
                        status: true,
                        message: 'Something went wrong - failed to fetch profile.'
                    });
                }
                res.json()
                    .then(resData => {
                        setProfileName(resData.profileName);
                        setProfileProducts(resData.profileProducts);
                        setProfileOrders(resData.profileOrders);
                        setMoreProducts(resData.moreProducts);
                        setMoreOrders(resData.moreOrders);
                        if (resData.profileName === resData.username) {
                            return setIsMyProfile(true);
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                return props.setError({status: true, message: 'Something went wrong - failed to fetch profile.'});
            })
        return () => {
            props.setError({status: false, message: ''});
        }
    }, [])

    if (!props.error.status) {
        return (
            <PageWrapper>
            <Header main>{profileName}'s Profile</Header>
            <ProfileLinksContainer>
                {isMyProfile ? 
                    <>
                        <Button add linkUrl="/create-product">Add Product</Button>
                    </>
                : null}
                    <Header>My Products</Header>
                    <ProfileProducts>
                        {(profileProducts.length < 1) ? <EmptyProducts>No products yet.</EmptyProducts> :
                        profileProducts.map(product => {
                            return <ProductCard product={product} />
                        })}
                        {moreProducts ? 
                        <SeeAllContainer>
                            <Link to={`/${profileName}/my-products`}>See All</Link>
                        </SeeAllContainer>
                        : null}                   
                    </ProfileProducts>
                {isMyProfile ? 
                <>
                    <Header>My Orders</Header>
                    <ProfileProducts>
                        {(profileOrders.length < 1) ? <EmptyProducts>No orders yet.</EmptyProducts> :
                        profileOrders.map(order => {
                            return <ProductCard product={order} order/>
                        })}
                        {moreOrders ? 
                        <SeeAllContainer>
                            <Link to={`/${profileName}/my-orders`}>See All</Link>
                        </SeeAllContainer>
                        : null}
                        
                    </ProfileProducts>
                    <Button onClick={props.logoutHandler} auth>Log Out</Button>
                </>
                : null}
            </ProfileLinksContainer>
            </PageWrapper>
        );
    } else {
        return <Error message={props.error.message} />
    }

}

export default Profile;


const ProfileLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ProfileProducts = styled.div`
    width: 100%;
    min-height: 14rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
`

const SeeAllContainer = styled.div`
    height: auto;
    align-self: center;
    margin: 4.4rem;
`