import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Error from '../UI/error';


const Profile = (props) => {
    // called "requestedName" because user may not exist
    // (such as typing in a random string in the username field in the url)
    const {requestedName} = useParams();

    const [profileName, setProfileName] = useState('')
    const [isMyProfile, setIsMyProfile] = useState(false);
    
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
            <>
            <h2>{profileName}'s Profile</h2>
            <ProfileLinksContainer>
                <Link to={`/${profileName}/my-products`}>My Products</Link>
                {isMyProfile ? 
                <>
                <Link to={`/${profileName}/my-orders`}>My Orders</Link>
                <Link to="/create-product">Create New Product</Link>
                </>
                : null}
            </ProfileLinksContainer>
            </>
        );
    } else {
        return <Error message={props.error.message} />
    }

}

export default Profile;

const ProfileLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & a {
        text-decoration: none;
        color: black;
        padding: 0.5rem;
    }

    & a:hover {
        font-weight: bold;
    }
`