import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import BSNavLink from './BSNavLink'
import AuthService from '../../services/auth0'

export default class Header extends Component {

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const { isLogged } = this.props

        return (
            <div>
                <Navbar className='port-navbar port-default absolute' color="transparent" dark expand="md">
                    <NavbarBrand className='port-navbar-brand' href="/">Andrii Zakharenkov</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <BSNavLink href='/' title='Home'/>
                            </NavItem>
                            
                            <NavItem className="port-navbar-item">
                                <BSNavLink href='/cv' title='CV'/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <BSNavLink href='/portfolios' title='Portfolios'/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <BSNavLink href='/blogs' title='Blogs'/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <BSNavLink href='/about' title='About'/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <a className="nav-link port-navbar-link" target="_blank" href='https://github.com/Drews4life'>Github</a>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                {
                                    !isLogged ? (
                                        <span onClick={AuthService.login} className="nav-link port-navbar-link clickable">Login</span>
                                    ) : (
                                        <span onClick={AuthService.logout} className="nav-link port-navbar-link clickable">Logout</span>
                                    )
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
