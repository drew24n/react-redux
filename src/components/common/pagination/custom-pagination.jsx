import React from "react"
import {Pagination} from "react-bootstrap"

const CustomPagination = (props) => {
    let pagesAmount = Math.ceil(props.usersCount / props.pageSize)
    let pages = []
    for (let i = 1; pagesAmount >= i; i++) pages.push(i)

    let portionsAmount = Math.ceil(pagesAmount / props.portionSize)
    let portionRangeStart = (props.portionNumber - 1) * props.portionSize + 1
    let portionRangeEnd = props.portionNumber * props.portionSize

    return (
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
    )
}

export default CustomPagination