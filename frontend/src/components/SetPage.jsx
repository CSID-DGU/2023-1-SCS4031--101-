import React from "react";
import styled from "styled-components";
import preBtn from "../assets/Pre.png";
import nextBtn from "../assets/Next.png";
import { Link } from "react-router-dom";

const SetPage = () => {
  return (
    <Wrap>
      <div className="text">미리보기 화면입니다</div>
      <div className="videoBx">
        <div className="before">
          <div className="beforeVideo"></div>
          <span className="beforeText">전</span>
        </div>
        <div className="after">
          <div className="afterVideo"></div>
          <span className="afterText">후</span>
        </div>
      </div>
      <div className="btnBx">
        <Link to="/test">
          <div className="preBx">
            <img src={preBtn} />
          </div>
        </Link>
        <Link>
          <div className="nextBx">
            <img src={nextBtn} />
          </div>
        </Link>
      </div>
    </Wrap>
  );
};

export default SetPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
  font-family: "Jua", sans-serif;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);

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

  .text {
    position: absolute;
    top: 30px;
    color: white;
    text-align: center;
    font-size: 3.7em;
    padding-top: 20px;
  }

  .videoBx {
    position: absolute;
    inset: 200px 250px 150px 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    .before {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      .beforeVideo {
        border: 1px solid red;
        flex: 5;
      }

      .beforeText {
        color: #fff;
        text-align: center;
        font-size: 3em;

        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }

    .after {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 20px;

      .afterVideo {
        border: 1px solid red;
        flex: 5;
      }

      .afterText {
        color: #fff;
        text-align: center;
        font-size: 3em;

        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }
  }
`;
