import styled from "styled-components";

export const Container = styled.header`
  grid-area: header;
  .navbar-toggler {outline: none};
  .active {color: #00FF00 !important};
  .brand-title {cursor: default};
  .not-authorized {cursor: default};
  .welcome {cursor: default};
  .nav-link {transition: all 0.3s ease};
`;

export const LogoImg = styled.img`
  height: 56px;
  width: 56px;
`;