import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HomeName = (props) => {
    if (props.main) {
        return <HomeNameSpan>CYBERTHRIFT</HomeNameSpan>
    }
    return <HomeNameLink to="/">CYBERTHRIFT</HomeNameLink>
}

export default HomeName;

const HomeNameSpan = styled.span`
    z-index: 11;
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: 'Audiowide', cursive;
    font-size: 8rem;
    padding-left: 2rem;
    text-shadow: 0.2rem 0.2rem black;
`

const HomeNameLink = styled(Link)`
    color: red;
    margin: 1rem 1rem 0 0;
    font-size: 2rem;
    text-shadow: 0.05rem 0.05rem gray;
    font-family: 'Audiowide', cursive;
    text-decoration: none;

`