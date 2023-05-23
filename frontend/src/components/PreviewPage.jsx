import React from "react";
import styled from "styled-components";
import preBtn from "../assets/Pre.png";
import nextBtn from "../assets/Next.png";
import { Link } from "react-router-dom";

const PreviewPage = () => {
  return (
    <Wrap>
      <div className="text">
        조정하고 싶은 비디오
        <br />
        화면을 설정해주세요
      </div>
      <div className="video" />
      <div className="btnBx">
        <Link to="/">
          <div className="preBx">
            <img src={preBtn} />
          </div>
        </Link>
        <Link to="/test">
          <div className="nextBx">
            <img src={nextBtn} />
          </div>
        </Link>
      </div>
    </Wrap>
  );
};

export default PreviewPage;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    position: absolute;
    top: 10px;
    color: white;
    text-align: center;
    font-size: 3.7em;
    padding-top: 20px;
  }

  .video {
    border: 1px solid black;
    position: absolute;
    inset: 200px 300px 150px 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btnBx {
    position: absolute;
    bottom: 35px;
    width: 25vw;
    height: 8vh;
    display: flex;

    div {
      flex: 1;
    }

    div img {
      width: 100%;
    }
  }
`;
