import React, { Component } from 'react'
import BaseLayout from '../src/layouts/BaseLayout'
import BasePage from '../src/layouts/BasePage'
import AuthService from '../services/auth0'
import { withRouter } from 'next/router'

class Callback extends Component {

    async componentDidMount() {
        try {
            await AuthService.handleAuth()
            this.props.router.push("/")
        } catch(e) {}
    }

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    <div>
                        Verifying login status...
                    </div>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withRouter(Callback)