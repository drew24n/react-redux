import styled from "styled-components";

export const Container = styled.footer`
  grid-area: footer;
  .scroll-up-btn:hover {
    background-color: rgba(135, 206, 235, 0.5);
  };
`;

export const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 72px;
  color: #fff;
  background-color: #343a40;
  cursor: default;
`;

export const ScrollUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 16px;
  bottom: 16px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rgba(135, 206, 235, 0.25);
  transition: all 0.5s ease;
  cursor: pointer;
  color: white;
  font-size: 30px;
`;