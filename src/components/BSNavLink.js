import React from 'react'
import Link from 'next/link'

export default ({href, title}) => (
    <Link href={href}>
        <a className="nav-link port-navbar-link">{title}</a>
    </Link>
)