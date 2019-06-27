import React from 'react'
import App, { Container } from 'next/app'
import AuthService from '../services/auth0'
import BaseLayout from '../src/layouts/BaseLayout'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'

export default class extends App {

    static async getInitialProps({ Component, router, ctx}) {
        let pageProps = {}
        const user = process.browser ? await AuthService.isAuthenticated() : await AuthService.isAuthenticatedServerSide(ctx.req)
        console.log('user: ', user)
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps, auth: { user, isLogged: !!user } }
    }

    render() {
        const { Component, pageProps, auth } = this.props
        return (
            <Container>
                <BaseLayout className="cover" {...auth}>
                    <Component {...pageProps}/>
                </BaseLayout>
            </Container>
        )
    }
}