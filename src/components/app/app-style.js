import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-areas: "header header" "main main" "footer footer";
  grid-template-rows: 72px 1fr 72px;
  background-color: #708090;
  min-height: 100vh;
`