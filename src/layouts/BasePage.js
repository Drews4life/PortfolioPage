import React from 'react'
import { Container } from 'reactstrap'

export default ({
    children, 
    className = ""
}) => 
    <div className={`base-page ${className}`}>
        <Container>
            {children}
        </Container>
    </div>