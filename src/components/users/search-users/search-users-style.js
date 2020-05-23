import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 72px;
  z-index: 1029;
  border-top: 1px solid #fff;
  box-sizing: border-box;
  #basic-nav-dropdown {
    padding: 0;
    color: #fff !important;
  }
  .dropdown-menu {
    margin-top: 10px !important;
    max-height: 450px;
    overflow-y: auto;
  }
  form {
    flex-wrap: nowrap;
  }
  .clear-search {
    position: absolute;
    right: 97px;
    border-radius: 0 0.25rem 0.25rem 0;
    z-index: 1;
  }
  .sidenav {
    height: fit-content;
    max-height: 400px;
    width: 250px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.85);
    margin-top: 54px;
    z-index: 4;
    transition: opacity 0.5s, visibility 0.5s;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .sidenav a {
    &:hover {
      background-color: #80bdff;
    }
`

export const IconSmall = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`