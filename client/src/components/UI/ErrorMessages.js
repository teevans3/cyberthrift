import React from 'react'

const ErrorMessages = (props) => {
    return (
        <div style={{width: '24rem', margin: 'auto'}}>
            <ul style={{listStyle: 'none', textAlign: 'left', color: 'red'}}>    
                {props.errorMessages.map(message => {
                    return (<li>{message}</li>)
                })}
            </ul>
        </div>
    )
}

export default ErrorMessages;