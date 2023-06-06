import React from "react";
import styled from "styled-components";
import { IoIosHome } from "react-icons/io";

const HomeBtn = () => {
  return (
    <Wrap>
      <div className="btnWrap">
        <IoIosHome className="homeButton" />
      </div>
    </Wrap>
  );
};

export default HomeBtn;

const Wrap = styled.div`
  z-index: 10005;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 10px;
  left: 10px;

  .btnWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid white; */
    width: 100px;
    height: 100px;

    .homeButton {
      width: 60%;
      height: 60%;
      padding: 10px;
      color: white;
      border: 1px solid white;
      border-radius: 50%;
    }
  }
`;
