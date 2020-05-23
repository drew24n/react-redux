import styled from "styled-components"

export const Container = styled.main`
  grid-area: main;
  padding-top: 20px;
  padding-bottom: 10px;
  .profile-photo {
    width: 150px;
    height: 150px;
  }
  .list-group-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    margin: 10px;
    width: 300px;
  }
  .form-control {
    width: 175px;
    margin-left: 5px;
  }
  .edit-profile-btn {
    width: fit-content;
    margin-top: 10px;
  }
  .group-title {
    color: #fff;
    cursor: default;
    width: 100%;
  }
  .cancel-btn {
    width: 141.28px;
    margin: 10px;
  }
  .save-btn {
    width: 141.28px;
    margin: 10px;
  }
  .response-error {
    color: #00FF00;
  }
`

export const CustomJobCheckbox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  margin-bottom: 0;
  #default-checkbox {
    display: none;
  }
  span {
    display: inline-flex;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid steelblue;
    box-sizing: border-box;
    transition: all 0.5s ease;
  }
  #default-checkbox:checked + span {background-color: steelblue};
`

export const CustomPhotoInput = styled.label`
  input {
    display: none;
  }
  img {
    width: fit-content;
    cursor: pointer;
  }
`