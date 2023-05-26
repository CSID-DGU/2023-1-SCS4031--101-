import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const VideoSelect = () => {
  const location = useLocation();

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.src = "http://127.0.0.1:5000/afteropencv";
    imgElement.alt = "ERROR";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.objectFit = "cover";
    imgElement.style.border = "3px solid red";
    const wrapElement = document.querySelector(".convertedVideo2");
    wrapElement.appendChild(imgElement);

    const imgElement2 = document.createElement("img");
    imgElement2.src = "http://127.0.0.1:5000/afteropencv2";
    imgElement2.alt = "ERROR";
    imgElement2.style.width = "100%";
    imgElement2.style.height = "100%";
    imgElement2.style.objectFit = "cover";
    const wrapElement2 = document.querySelector(".convertedVideo1");
    wrapElement2.appendChild(imgElement2);

    const imgElement3 = document.createElement("img");
    imgElement3.src = "http://127.0.0.1:5000/afteropencv3";
    imgElement3.alt = "ERROR";
    imgElement3.style.width = "100%";
    imgElement3.style.height = "100%";
    imgElement3.style.objectFit = "cover";
    const wrapElement3 = document.querySelector(".convertedVideo3");
    wrapElement3.appendChild(imgElement3);

    const imgElementPre = document.createElement("img");
    imgElementPre.src = "http://127.0.0.1:5000/beforeopencv";
    imgElementPre.alt = "ERROR";
    imgElementPre.style.width = "100%";
    imgElementPre.style.height = "100%";
    imgElementPre.style.objectFit = "cover";
    const wrapElementPre = document.querySelector(".preVideo");
    wrapElementPre.appendChild(imgElementPre);

    return () => {
      wrapElement.removeChild(imgElement);
      wrapElement2.removeChild(imgElement2);
      wrapElement3.removeChild(imgElement3);
      wrapElementPre.removeChild(imgElementPre);
      // Stop the camera when the component is unmounted
      // fetch("http://127.0.0.1:5000/stop");
    };
  }, [location]);

  return (
    <Wrap>
      <div className="text">
        단계 3 : 3개의 화면에서 원하는 보정 화면을 선택해주세요
      </div>
      <div className="videoWrap">
        <div className="preVideoWrap">
          <div className="preVideo"></div>
        </div>
        <div className="convertedVideoWrap">
          <div className="convertedVideo1Bx">
            <div className="convertedVideo1" />
            <span className="convertedText1">옅음</span>
          </div>
          <div className="convertedVideo2Bx">
            <div className="convertedVideo2" />
            <span className="convertedText2">중간</span>
          </div>
          <div className="convertedVideo3Bx">
            <div className="convertedVideo3" />
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
        height: 50vh;
      }
    }

    .convertedVideoWrap {
      border: 1px solid green;
      flex: 1.3;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .convertedVideo1Bx {
        border: 1px solid white;
        display: flex;
        justify-content: space-evenly;
        height: 25vh;

        .convertedVideo1 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
          height: 100%;
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
        height: 25vh;

        .convertedVideo2 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
          height: 100%;
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
        height: 25vh;

        .convertedVideo3 {
          cursor: pointer;
          border: 1px solid black;
          width: 70%;
          height: 100%;
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