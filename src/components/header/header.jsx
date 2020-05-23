import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {Button, Nav, Navbar} from "react-bootstrap"
import {Container} from "./header-style"
import logo from "../../assets/images/logo192.png"
import {logout} from "../../redux/auth-reducer"
import Preloader from "../common/preloader/preloader"

const Header = (props) => {
    if (props.isFetching === true) return <Preloader/>

    return (
        <Container>
            <Navbar fixed={"top"} expand={"md"} bg={"dark"} variant={"dark"} collapseOnSelect>
                <Navbar.Brand className={"p-0"}>
                    <Nav.Link className={"p-0"} as={NavLink} active={false} exact to={"/"} href={"/"}>
                        <img src={logo} alt={"Logo"}/>
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Brand className={"ml-3 brand-title"}>Social Network</Navbar.Brand>
                <Navbar.Toggle className={"ml-3"} aria-controls={"basic-navbar-nav"}/>
                <Navbar.Collapse id={"basic-navbar-nav"} data-toggle={"collapse"}>
                    <Nav className={"mr-auto text-center"}>
                        {/*<Nav.Link as={NavLink} active={false} className={"ml-3 mr-3"} exact to={"/"}*/}
                        {/*          href={"/"}>Home</Nav.Link>*/}
                        <Nav.Link as={NavLink} active={false} className={"ml-3 mr-3"} to={"/profile"}
                                  href={"/profile"}>Profile</Nav.Link>
                        <Nav.Link as={NavLink} active={false} className={"ml-3 mr-3"} to={"/users"}
                                  href={"/users"}>Users</Nav.Link>
                    </Nav>
                    {props.isAuthorized === true
                        ? <Nav className={"ml-auto"}>
                            <Nav.Item className={"text-info d-flex align-items-center justify-content-center " +
                            "text-right ml-2 mr-2 welcome"}>Welcome, {props.login}</Nav.Item>
                            <Nav.Link as={NavLink} active={false} className={"m-auto"} to={"/"} /*href={"/"}*/>
                                <Button onClick={props.logout} className={"shadow-none"}
                                        variant={"success"}>Logout</Button>
                            </Nav.Link>
                        </Nav>
                        : <Nav className={"ml-auto"}>
                            <Nav.Item className={"text-danger d-flex align-items-center justify-content-center " +
                            "ml-2 mr-2 not-authorized"}>Not Authorized!</Nav.Item>
                            <Nav.Link as={NavLink} active={false} className={"m-auto"} to={"/login"} href={"/login"}>
                                <Button className={"shadow-none"} variant={"success"}>Login</Button>
                            </Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login,
    isFetching: state.auth.isFetching
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
