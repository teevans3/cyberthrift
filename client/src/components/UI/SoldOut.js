import React from 'react';
import styled from 'styled-components';

const SoldOut = () =>  {
    return (
        <SoldOutTag>SOLD OUT</SoldOutTag>
    )
}

export default SoldOut;

const SoldOutTag = styled.span`
    color: red;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    font-weight: bold;

    @media (max-width: 56.188rem) {
        text-align: center;
    }
`