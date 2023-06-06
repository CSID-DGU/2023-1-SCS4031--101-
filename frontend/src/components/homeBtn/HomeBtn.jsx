import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeBtn = () => {
  return (
    <Wrap>
      <Link to="/home">
        <button className="btn btn1">Home</button>
      </Link>
    </Wrap>
  );
};

export default HomeBtn;

const Wrap = styled.div`
  z-index: 10005;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 50px;
  left: 50px;

  .btn {
    border: 1px solid #fff;
    background: none;
    padding: 10px 20px;
    font-size: 20px;
    font-family: "montserrat";
    cursor: pointer;
    transition: 0.8s;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 0%;
      background: #fff;
      z-index: -1;
      transition: 0.8s;
    }
  }

  .btn1 {
    color: #fff;

    &::before {
      top: 0;
      border-radius: 0 0 50% 50%;
    }
  }

  .btn1:hover {
    color: #ea4757;

    &::before {
      height: 180%;
    }
  }
`;
