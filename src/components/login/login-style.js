import styled from "styled-components";

export const Container = styled.main`
  grid-area: main;
  align-self: center;
  justify-self: center;
  .auth-form {width: 200px};
  .server-error {"color": "#00FF00"};
`;

export const Captcha = styled.img`
  width: 200px;
  height: 70px;
`;