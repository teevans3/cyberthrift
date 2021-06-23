import React from 'react'

const ThankYou = (props) => {
    const productInfo = props.location.state.productInfo;
    return (
        <>
            <h2>Thank you for your purchase of product number {productInfo.id} </h2>
            <h4>A purchase confirmation has been sent to your email. You should receive this item within 4-7 business days.</h4>
        </>
    )
}

export default ThankYou;