import React from "react";
import styled from "styled-components";

const VideoSelect = () => {
  return (
    <Wrap>
      <div className="text">
        단계 3 : 3개의 화면에서 원하는 보정 화면을 선택해주세요
      </div>
      <div className="videoWrap">
        <div className="preVideoWrap">
          <div className="preVideo">여기에 이전 비디오</div>
        </div>
        <div className="convertedVideoWrap">
          <div className="convertedVideo1Bx">
            <div className="convertedVideo1">비디오1</div>
            <span className="convertedText1">옅음</span>
          </div>
          <div className="convertedVideo2Bx">
            <div className="convertedVideo2">비디오2</div>
            <span className="convertedText2">중간</span>
          </div>
          <div className="convertedVideo3Bx">
            <div className="convertedVideo3">비디오3</div>
            <span className="convertedText3">진함</span>
          </div>
        </div>
      </div>
      <div className="textWrap">
        <span className="textBefore">변환전</span>
        <span className="textAfter">변환후</span>
      </div>
    </Wrap>
  );
};

export default VideoSelect;

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
    display: flex;
    align-items: center;
    flex: 1;
    color: #fff;
    font-size: 3vw;
  }

  .videoWrap {
    flex: 13;
    width: 100%;
    display: flex;

    .preVideoWrap {
      border: 1px solid orange;
      flex: 1;
      display: flex;
      align-items: center;

      .preVideo {
        border: 1px solid white;
        width: 100%;
        height: 70%;
      }
    }

    .convertedVideoWrap {
      border: 1px solid green;
      flex: 1.3;

      .convertedVideo1Bx {
        border: 1px solid white;
        display: flex;
        justify-content: space-evenly;
        height: 33%;

        .convertedVideo1 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
        }

        .convertedText1 {
          display: flex;
          align-items: end;
          color: #fff;
          font-size: 1.5vw;
        }
      }

      .convertedVideo2Bx {
        border: 1px solid white;
        display: flex;
        justify-content: space-evenly;
        height: 33%;

        .convertedVideo2 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
        }

        .convertedText2 {
          display: flex;
          align-items: end;
          color: #fff;
          font-size: 1.5vw;
        }
      }

      .convertedVideo3Bx {
        border: 1px solid white;
        display: flex;
        justify-content: space-evenly;
        height: 33%;

        .convertedVideo3 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
        }

        .convertedText3 {
          display: flex;
          align-items: end;
          color: #fff;
          font-size: 1.5vw;
        }
      }
    }
  }

  .textWrap {
    width: 100%;
    flex: 1;
    display: flex;

    .textBefore {
      color: #fff;
      font-size: 2.5vw;
      display: flex;
      flex: 1;
      width: 50%;
      justify-content: center;
      align-items: center;
    }

    .textAfter {
      color: #fff;
      font-size: 2.5vw;
      display: flex;
      flex: 1.1;
      width: 50%;
      justify-content: center;
      align-items: center;
    }
  }
`;
