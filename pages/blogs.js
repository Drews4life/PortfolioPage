import React, { Component } from 'react'
import BaseLayout from '../src/layouts/BaseLayout'
import BasePage from '../src/layouts/BasePage'

export default class Blogs extends Component {

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    Blogs
                </BasePage>
            </BaseLayout>
        )
    }
}