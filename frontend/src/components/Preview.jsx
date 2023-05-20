import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import preBtn from "../assets/preBtn.png";
import nextBtn from "../assets/nextBtn.png";

const Preview = () => {
  return (
    <Wrap>
      <div className="text">
        단계1
        <br />
        원하는 화면이 보이도록 카메라를 설정해주세요
      </div>
      <div className="video">여기에 비디오</div>
      <div className="btnBx">
        <Link to="/">
          <div className="preBx">
            <img src={preBtn} />
          </div>
        </Link>
        <Link to="/setting">
          <div className="nextBx">
            <img src={nextBtn} />
          </div>
        </Link>
      </div>
    </Wrap>
  );
};

export default Preview;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;

  .text {
    color: #fff;
    text-align: center;
    font-size: 3vw;
    margin-bottom: 70px;
  }

  .video {
    width: 50vw;
    height: 50vh;
    border: 1px solid black;
  }

  .btnBx {
    margin-top: 30px;
    display: flex;
  }

  .preBx {
    img {
      width: 10vw;
    }
  }

  .nextBx {
    img {
      width: 10vw;
    }
  }
`;
