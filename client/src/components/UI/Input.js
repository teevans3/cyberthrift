import React from 'react'
import styled from 'styled-components';

const Input = (props) => {
    if (props.type === 'radio') {
        return (
            <RadioContainer>
                <input type={props.type} name={props.name} id={props.id} value={props.id} checked={props.checked} onChange={props.onChange}/>
                <label for={props.labidel}>{props.label}</label>
            </RadioContainer>
        )
    }
    return (
        <InputContainer>
            <label for={props.id}>{props.label}</label>
            {props.type === 'textarea' ? 
            <textarea type={props.type} id={props.id} value={props.value} onChange={props.onChange} /> :
            <input type={props.type} id={props.id} step={props.step} value={props.value} onChange={props.onChange} />
            }
        </InputContainer>
    )
}

export default Input;

const InputContainer = styled.div`
    width: 24rem;
    margin: auto;
    display: flex;
    flex-direction: column;

    & label {
        text-align: left;
        padding: 1rem 0 0.5rem 0;
    }

    & input {
        height: 2rem;
    }

    & textarea {
        resize: none;
        height: 6rem;
    }
`

const RadioContainer = styled.div`
    text-align: left;
`