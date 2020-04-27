import styled from "styled-components";

export const Container = styled.main`
  grid-area: main;
  padding-top: 20px;
  padding-bottom: 10px;
  .rounded-circle {
    width: 150px;
    height: 150px;
  };
  #custom-photo-input {
    display: none;
  };
  .profile-photo-label {
    width: fit-content;
    cursor: pointer;
  };
  .list-group-item {
    cursor: default;
    margin: 10px;
    width: 300px;
  };
  .list-group-item > div {
    margin-top: 5px;
  };
  .form-control {
    width: 250px;
    margin: 0 auto;
  };
  .form-check {
    width: 200px;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  };
  .edit-profile-btn {
    width: fit-content;
    margin-top: 10px;
  };
  .group-title {
    color: #fff;
    cursor: default;
    width: 100%;
  };
  .cancel-btn {
    width: 141.28px;
    margin: 10px;
  };
  .save-btn {
    width: 141.28px;
    margin: 10px;
  };
  .response-error {
    color: #00FF00;
  };
  #default-checkbox {
    display: none;
  };
  .checkbox-label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  };
  .custom-checkbox {
    display: inline-flex;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid steelblue;
    box-sizing: border-box;
    transition: all 0.5s ease;
  };
  #default-checkbox:checked ~ .custom-checkbox {background-color: steelblue};
`;