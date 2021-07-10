import React from 'react'
import styled from 'styled-components';

const PageWrapper = (props) => {
    return (
        <Wrapper home={props.home}>{props.children}</Wrapper>
    )
}

export default PageWrapper;

const Wrapper = styled.div`
    max-width: 87.5rem;
    margin: auto;
    margin-top: 'auto';

`