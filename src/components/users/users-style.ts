import styled from "styled-components"

export const Container = styled.main`
  grid-area: main;
  align-self: center;
  .page-link {
    box-shadow: none
  }
  .card-deck {
    margin-top: 64px !important;
  }
  .card {
    min-width: 235px;
    max-width: 235px;
    min-height: 235px;
  }
  .card-img-top {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    cursor: pointer; 
  }
  .card.nav-link {
    width: fit-content;
  }
`