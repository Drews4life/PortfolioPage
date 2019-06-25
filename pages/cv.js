import React, { Component } from 'react'
import BaseLayout from '../src/layouts/BaseLayout'
import BasePage from '../src/layouts/BasePage'

export default class CV extends Component {

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    CV
                </BasePage>
            </BaseLayout>
        )
    }
}