import styled from "styled-components"

export const Container = styled.main`
  grid-area: main;
  align-self: center;
  justify-self: center;
  form {
    width: 185px;
  }
  .response-error {
    color: #00FF00;
  }
`

export const Captcha = styled.img`
  width: 185px;
  height: 70px;
`
