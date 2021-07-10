import React from 'react'

import PageWrapper from '../../components/Layout/PageWrapper';
import Header from '../../components/UI/Header';

const ThankYou = (props) => {
    const productInfo = props.location.state.productInfo;
    return (
        <PageWrapper>
            <Header main>Thank you for your purchase of "{productInfo.name}" </Header>
            <h4>Order number {productInfo.id} is on it's way! A purchase confirmation has been sent to your email. You should receive this item within 4-7 business days.</h4>
        </PageWrapper>
    )
}

export default ThankYou;