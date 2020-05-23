import React from "react"
import {NavLink} from "react-router-dom"
import {Container} from "./users-style"
import {Button, Card, CardDeck, Pagination, Spinner} from "react-bootstrap"
import defaultPhoto from "../../assets/images/default-user-picture.png"
import SearchUsers from "./search-users/search-users"

const Users = (props) => {
    let pagesAmount = Math.ceil(props.usersCount / props.pageSize)
    let pages = []
    for (let i = 1; pagesAmount >= i; i++) pages.push(i)

    let portionsAmount = Math.ceil(pagesAmount / props.portionSize)
    let portionRangeStart = (props.portionNumber - 1) * props.portionSize + 1
    let portionRangeEnd = props.portionNumber * props.portionSize

    return (
        <Container>
            <SearchUsers friends={props.friends} getUsers={props.getUsers}
                         pageNumber={props.pageNumber} pageSize={props.pageSize} term={props.term}
                         setSearchTerm={props.setSearchTerm} getPageNumber={props.getPageNumber}
                         getFriends={props.getFriends}/>
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
                            {user.followed === true
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
            <Pagination className={"justify-content-center flex-wrap mt-2 mb-3"}>
                <Pagination.First onClick={() => props.setPortionNumber(1)}/>
                <Pagination.Prev onClick={() => props.setPortionNumber(props.portionNumber - 1)}
                                 className={props.portionNumber <= 1 && "disabled"}/>
                {pages.filter(p => p >= portionRangeStart && p <= portionRangeEnd).map(p =>
                    <Pagination.Item key={p} className={props.pageNumber === p && "active"}
                                     onClick={() => props.getPageNumber(p, props.pageSize)}>{p}</Pagination.Item>
                )}
                <Pagination.Next onClick={() => props.setPortionNumber(props.portionNumber + 1)}
                                 className={props.portionNumber === portionsAmount && "disabled"}/>
                <Pagination.Last onClick={() => props.setPortionNumber(portionsAmount)}/>
            </Pagination>
        </Container>
    )
}

export default Users