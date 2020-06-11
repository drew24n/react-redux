import React, {FC} from "react"
import {NavLink} from "react-router-dom"
import {Container} from "./users-style"
import {Button, Card, CardDeck, Spinner} from "react-bootstrap"
import defaultPhoto from "../../assets/images/default-user-picture.png"
import SearchUsers from "./search-users/search-users"
import CustomPagination from "../common/pagination/custom-pagination"
import {propsType} from "./users-container";

const Users: FC<propsType> = (props) => {
    return (
        <Container>
            <SearchUsers friends={props.friends} getUsers={props.getUsers}
                         pageNumber={props.pageNumber} pageSize={props.pageSize} term={props.term}
                         setSearchTerm={props.setSearchTerm} getPageNumber={props.getPageNumber}
                         getFriends={props.getFriends} isFriendsListFetching={props.isFriendsListFetching}
                         setPortionNumber={props.setPortionNumber}/>
            <CardDeck className={"d-flex flex-wrap justify-content-center mr-3 ml-3 mt-2"}>
                {props.users.map(user =>
                    <Card key={user.id} border={"primary"} className={"mr-2 ml-2 mt-2 mb-2"}>
                        <NavLink to={`/profile/${user.id}`} className={"m-auto"}>
                            <Card.Img className={"mt-1 mb-1"} variant="top" src={
                                user.photos.large === null ? defaultPhoto : user.photos.large}/>
                        </NavLink>
                        <Card.Body className={"p-0 text-center"}>
                            <Card.Title className={"mb-0"}>Name: {user.name}</Card.Title>
                            <Card.Text
                                className={"mb-0"}>{user.status ? `Status: ${user.status}` : "no status"}</Card.Text>
                            {user.followed
                                ? <Button onClick={() => props.unfollow(user.id)} className={"mb-2 mt-1 shadow-none"}
                                          variant="primary"
                                          disabled={props.isFollowInProcess.some(id => id === user.id)}>Unfollow
                                    {props.isFollowInProcess.some(id => id === user.id) &&
                                    <Spinner className={"ml-1"} as="span" animation="border" size="sm" role="status"
                                             aria-hidden="true"/>
                                    }
                                </Button>
                                : <Button onClick={() => props.follow(user.id)} className={"mb-2 mt-1 shadow-none"}
                                          variant="primary"
                                          disabled={props.isFollowInProcess.some(id => id === user.id)}>Follow
                                    {props.isFollowInProcess.some(id => id === user.id) &&
                                    <Spinner className={"ml-1"} as="span" animation="border" size="sm" role="status"
                                             aria-hidden="true"/>
                                    }
                                </Button>
                            }
                        </Card.Body>
                    </Card>
                )}
            </CardDeck>
            <CustomPagination {...props}/>
        </Container>
    )
}

export default Users
