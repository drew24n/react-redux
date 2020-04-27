import styled from "styled-components";

export const Container = styled.main`
  grid-area: main;
  align-self: center;
  .page-link {box-shadow: none};
  .card {
    min-width: 235px;
    max-width: 235px;
    min-height: 235px;
  };
  .card-img-top {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    cursor: pointer; 
  };
  .router-nav-link {width: fit-content};
`;