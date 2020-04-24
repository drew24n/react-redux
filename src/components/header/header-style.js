import styled from "styled-components";

export const Container = styled.header`
  grid-area: header;
  .navbar-toggler {outline: none};
  .nav-link {color: rgba(255, 255, 255, 0.5) !important};
  .active {color: #00FF00 !important};
  .brand-title {cursor: default};
  .not-authorized {cursor: default};
`;

export const LogoImg = styled.img`
  height: 56px;
  width: 56px;
`;