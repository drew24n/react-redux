import React, {FC, useState} from "react"
import {Container, IconSmall} from "./search-users-style"
import {Button, Form, Nav, Navbar, NavDropdown, Spinner} from "react-bootstrap"
import img from "../../../assets/images/default-user-picture.png"
import {NavLink} from "react-router-dom"
import {Field, reduxForm} from "redux-form"
import {Input} from "../../common/forms/input"
import {userItem} from "../../../api/api-users";
import {InjectedFormProps} from "redux-form/lib/reduxForm";

type propsType = {
    friends: Array<userItem>
    term: string
    isFriendsListFetching: boolean
    pageNumber: number
    pageSize: number
    setPortionNumber: (portionNumber: number) => void
    getPageNumber: (pageNumber: number) => void
    getFriends: () => void
    setSearchTerm: (term: string) => void
    getUsers: (pageNumber: number, pageSize: number, isFriend: boolean, term: string) => void
}

type termSubmit = {
    term: string
}

const SearchUsers: FC<propsType> = (props) => {
    let search = (term: termSubmit) => {
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

    type initialStateType = {
        opacity: number
        visibility: "hidden" | "visible"
    }

    let [friendsBar, showFriendsBar] = useState<initialStateType>({opacity: 0, visibility: "hidden"})
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
                        {props.isFriendsListFetching &&
                        <Spinner className={"ml-1"} as="span" animation="border" size="sm" role="status"
                                 aria-hidden="true"/>
                        }
                    </Button>
                </Nav>
                <SearchReduxForm onSubmit={search} initialValues={props}/>
                <Button onClick={clearSearchResult} variant="danger"
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

const SearchForm: FC<InjectedFormProps<termSubmit>> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit} inline className={"ml-auto"}>
            <Field className={"form-control"} name={"term"} component={Input} type={"input"}
                          placeholder={"Search user"}/>
            <Button as={"button"} variant="success" className={"ml-2 shadow-none"}>Search</Button>
            {props.error && <div className={"response-error text-center mb-3"}>{props.error}</div>}
        </Form>
    )
}

const SearchReduxForm = reduxForm<termSubmit>({form: "search"})(SearchForm)

export default SearchUsers
