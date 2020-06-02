import React, {useState} from "react"
import {Container, IconSmall} from "./search-users-style"
import {Button, Form, Nav, Navbar, NavDropdown, Spinner} from "react-bootstrap"
import img from "../../../assets/images/default-user-picture.png"
import {NavLink} from "react-router-dom"
import {Field, reduxForm} from "redux-form"
import {Input} from "../../common/forms/input"

const SearchUsers = (props) => {
    let search = (term) => {
        if (term.term) {
            props.setPortionNumber(1)
            props.getPageNumber(1)
            props.setSearchTerm(term.term)
        }
    }
    let clearSearchResult = () => {
        if (props.term) {
            props.setSearchTerm("")
            props.setPortionNumber(1)
            props.getPageNumber(1)
        }
    }

    let [friendsBar, showFriendsBar] = useState({opacity: 0, visibility: "hidden"})
    let toggleFriendsBar = () => {
        if (props.friends.length === 0) {
            props.getFriends()
        }
        showFriendsBar(friendsBar.opacity === 0
            ? {...friendsBar, opacity: 1, visibility: "visible"}
            : {...friendsBar, opacity: 0, visibility: "hidden"})
    }

    return (
        <Container>
            <Navbar bg="dark">
                <Nav className="mr-2">
                    <Button className={"btn-info shadow-none"} onClick={toggleFriendsBar}
                            disabled={props.isFriendsListFetching}>Friends
                        {props.isFriendsListFetching === true &&
                        <Spinner className={"ml-1"} as="span" animation="border" size="sm" role="status"
                                 aria-hidden="true"/>
                        }
                    </Button>
                </Nav>
                <SearchReduxForm onSubmit={search} initialValues={props}/>
                <Button onClick={clearSearchResult} type={"input"} variant="danger"
                        className={"ml-2 shadow-none clear-search"}>X</Button>
            </Navbar>
            <div style={{opacity: friendsBar.opacity, visibility: friendsBar.visibility}} className="sidenav">
                {props.friends.map(f =>
                    <NavDropdown.Item as={NavLink} to={`/profile/${f.id}`} className={"text-info"} key={f.id}>
                        <IconSmall src={f.photos.small ? f.photos.small : img}/>{f.name}
                    </NavDropdown.Item>
                )}
            </div>
        </Container>
    )
}

const SearchForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit} inline className={"ml-auto"}>
            <Form.Control as={Field} name={"term"} component={Input} type={"input"}
                          placeholder={"Search user"}/>
            <Button type={"input"} variant="outline-success" className={"ml-2 shadow-none"}>Search</Button>
            {props.error && <div className={"response-error text-center mb-3"}>{props.error}</div>}
        </Form>
    )
}

const SearchReduxForm = reduxForm({
    form: "search"
})(SearchForm)

export default SearchUsers