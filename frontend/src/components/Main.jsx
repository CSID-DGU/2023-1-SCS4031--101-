import styled from "styled-components";
import React from "react";
import board from "../assets/board.png";
import homeBtn from "../assets/homeBtn.png";
import RealTimeBtn from "../assets/RealTimeBtn.png";
import SavedBtn from "../assets/SavedBtn.png";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <Wrap>
      <div className="textBx">
        <div className="textWrap">
          <div className="text1">안녕하세요일영일입니다</div>
          <div className="textWrap2">
            <div className="text2">색각이상자를위한</div>
          </div>
          <div className="textWrap3">
            <div className="text3">비디오변환서비스</div>
          </div>
          <div className="btnBx">
            <Link to="/preview">
              <img className="RealTimeBtn" src={RealTimeBtn} />
            </Link>
            <Link to="/savedsetting">
              <img className="SavedBtn" src={SavedBtn} />
            </Link>
            <Link to="/home">
              <img className="homeBtn" src={homeBtn} />
            </Link>
          </div>
        </div>
      </div>
      <div className="imgBx">
        <div className="imgWrap">
          <img src={board} />
        </div>
      </div>
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;

  .textBx {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btnBx {
      /* border: 1px solid white; */
      margin-top: 20px;
      width: 38em;
      height: 3.2em;
      display: flex;

      .RealTimeBtn {
        /* border: 1px solid red; */
        cursor: pointer;
        width: 100%;
        height: 100%;
      }

      .SavedBtn {
        cursor: pointer;
        width: 100%;
        height: 100%;
        margin-left: 10px;
      }

      .homeBtn {
        cursor: pointer;
        width: 8 0%;
        height: 100%;
        margin-left: 20px;
      }
    }

    .textWrap {
      position: relative;
      left: 40px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;

      .text1 {
        color: white;
        font-size: 4.5em;
        margin-bottom: 40px;
        border-right: 5px solid;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        animation: typing 2s steps(11), cursor 0.4s step-end infinite alternate,
          hideCursor 0.5s 2s step-end forwards;
      }

      .text2 {
        border: 1px solid red;
        color: white;
        font-size: 5.5em;
        border-right: 5px solid;
        width: 98%;
        white-space: nowrap;
        overflow: hidden;
        visibility: hidden;
        animation: typing 2s steps(8) 2s forwards,
          cursor 0.4s step-end infinite alternate 2s,
          hideCursor 0.5s 2s step-end forwards, visibility 0s linear 2s forwards;
      }

      .text3 {
        color: white;
        font-size: 5.5em;
        border-right: 5px solid;
        width: 99%;
        white-space: nowrap;
        overflow: hidden;
        visibility: hidden;
        animation: typing 2s steps(8) 4s forwards,
          cursor 0.4s step-end infinite alternate 4s,
          visibility 0s linear 4s forwards;
      }

      @keyframes typing {
        from {
          width: 0;
        }
      }

      @keyframes cursor {
        50% {
          border-color: transparent;
        }
      }

      @keyframes hideCursor {
        to {
          border-color: transparent;
        }
      }

      @keyframes visibility {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    }
  }

  .imgBx {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .imgWrap {
      width: 90%;
      height: 80%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
