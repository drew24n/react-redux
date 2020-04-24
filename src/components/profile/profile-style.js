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
    transition: all 0.3s ease;
  };
  .profile-photo-label:hover {
    transform: scale(1.1);
  }
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
  };
  .group-title {
    color: #fff;
    cursor: default;
    width: 100%;
  };
  .cancel-btn {
    width: 121.28px;
    margin: 10px;
  };
  .save-btn {
    margin: 10px;
  }
`;