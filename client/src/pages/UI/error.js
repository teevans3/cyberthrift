import React from 'react'
import {Link} from 'react-router-dom';

import PageWrapper from '../../components/Layout/PageWrapper';
import Header from '../../components/UI/Header';

const Error = (props) => {
    return (
        <PageWrapper>
            <Header main>Error: {props.message}</Header>
            {props.type === 'authorization' ?
                <Link to="/signup" style={{color: 'red', textDecoration: 'none'}}>Create an account</Link>
                :
                null
            }
        </PageWrapper>
    )
}

export default Error;