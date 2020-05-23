import React, {useState} from "react"
import {Container, IconSmall} from "./search-users-style"
import {Button, Form, Nav, Navbar, NavDropdown} from "react-bootstrap"
import img from "../../../assets/images/default-user-picture.png"
import {NavLink} from "react-router-dom"
import {Field, reduxForm} from "redux-form"
import {Input} from "../../common/forms/input"

const SearchUsers = (props) => {
    let search = (term) => {
        props.getUsers(props.pageNumber, props.pageSize, false, term.term)
        props.getPageNumber(1)
    }
    let clearSearchValue = () => {
        props.setSearchTerm("")
        props.getPageNumber(1)
    }

    let [friendsBar, showFriendsBar] = useState(0)
    let [barVisibility, changeVisibility] = useState("hidden")
    let toggleFriendsBar = () => {
        changeVisibility(barVisibility === "hidden" ? "visible" : "hidden")
        showFriendsBar(friendsBar === 0 ? 1 : 0)
    }

    return (
        <Container>
            <Navbar bg="dark">
                <Nav className="mr-2">
                    <Button className={"btn-info shadow-none"} onClick={toggleFriendsBar}>Friends</Button>
                </Nav>
                <SearchReduxForm onSubmit={search} initialValues={props}/>
                <Button onClick={clearSearchValue} type={"input"} variant="danger"
                        className={"ml-2 shadow-none clear-search"}>X</Button>
            </Navbar>
            <div style={{opacity: friendsBar, visibility: barVisibility}} className="sidenav">
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
    form: "search",
    touchOnBlur: false
})(SearchForm)

export default SearchUsers