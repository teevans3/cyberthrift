import React from 'react'

const ProductInfoTitle = (props) => {
    return (
        <p style={{
            margin: '0',
            fontWeight: 'bold',
            fontSize: '1.2rem'
        }}>{props.children}</p>
    )
}

export default ProductInfoTitle;