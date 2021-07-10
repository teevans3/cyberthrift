import React from 'react'

const ProductInfo = (props) => {
    return (
        <p style={{
            fontSize: '1rem',
            margin: '0.5rem 0 2rem 0'
        }}>{props.children}</p>
    )
}

export default ProductInfo;