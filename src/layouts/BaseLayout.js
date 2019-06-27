import React from 'react'
import Header from '../components/Header'

const BaseLayout = ({
    children,
    isLogged,
    className = ""
}) => {

    return (
        <div className="layout-container">
            <Header isLogged={isLogged}/>
            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout