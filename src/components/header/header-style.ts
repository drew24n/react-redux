import styled from "styled-components"

export const Container = styled.header`
  grid-area: header;
  nav {
    min-width: 360px !important;
  }
  .navbar-brand img {
    height: 56px;
    width: 56px;
  }
  .navbar-toggler {
    outline: none;
  }
  .nav-link {
    transition: all 0.5s ease;
  }
  .nav-link.active {
    color: #00FF00 !important;
  }
  #basic-navbar-nav a {
    padding-left: 0;
    padding-right: 0;
  }
`
