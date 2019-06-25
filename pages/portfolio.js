import React, { Component } from 'react'
import BaseLayout from '../src/layouts/BaseLayout'
import BasePage from '../src/layouts/BasePage'
// import { } from 'next-routes'

export default class Portfolio extends Component {

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    Portfolios
                </BasePage>
            </BaseLayout>
        )
    }
}