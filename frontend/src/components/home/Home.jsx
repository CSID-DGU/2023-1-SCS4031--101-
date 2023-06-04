import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "./Header";
import Ask from "./Ask";
import BoardImg from "../../assets/HomeBoard.png";
import ConvertImg from "../../assets/ConvertImg.png";
import Chalk from "../../assets/Chalk.jpg";
import Original from "../../assets/Original.jpg";
import NotOriginal from "../../assets/NotOriginal.jpg";
import Triangle from "../../assets/Triangle.png";
import Logo from "../../assets/Logo.png";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const originalImgRef = useRef(null);
  const notOriginalImgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const box2Element = document.querySelector(".box2");
    if (box2Element) {
      observer.observe(box2Element);
    }

    if (notOriginalImgRef.current) {
      observer.observe(notOriginalImgRef.current);
    }

    if (originalImgRef.current) {
      observer.observe(originalImgRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (notOriginalImgRef.current) {
        observer.unobserve(notOriginalImgRef.current);
      }

      if (originalImgRef.current) {
        observer.unobserve(originalImgRef.current);
      }

      if (box2Element) {
        observer.unobserve(box2Element);
      }
    };
  }, []);

  return (
    <Wrap>
      <Header />
      <div className="boardBx">
        <img src={BoardImg} loading="lazy" />
        <div className="textWrap">
          <div className="textBx1">
            <TypeAnimation
              cursor={true}
              sequence={["색각 이상자를 위한\n비디오 변환 서비스입니다", 5000]}
              speed={1}
              wrapper="pre"
              repeat
            ></TypeAnimation>
          </div>
          <div className="textBx2">
            빠르게 실시간으로 비디오를 변환해 보세요!
          </div>
          <div className="textBx3">
            비디오 변환하기
            <div className="imgWrap">
              <img src={ConvertImg} />
            </div>
          </div>
        </div>
      </div>
      <div className="spacer">
        <div className="chalk">
          <img src={Chalk} />
        </div>
        <div className="box1">
          <div className="introWrap">
            <div className="introBx">
              <div className="whatIsText">일영일이란??</div>
              <div className="whatIsTextContent">
                일영일은 색각 이상이 있는 사용자도 교육 환경에 편리하게
                <br />
                참여 할 수 있게 도와주는 웹 서비스입니다.
                <br />
                수업이나 강의 자료를 더욱 편리하게 이해하고 사용할 수 있도록,
                <br />
                저희는 HSV(색상, 채도, 명도) 값을 조정하여
                <br />
                실시간 영상을 재구성하고 있습니다.
              </div>
            </div>
            <div className="colorImgWrap">
              <div className="originalImgBx" ref={originalImgRef}>
                <img src={Original} />
                <span>원본 사진</span>
              </div>
              <div className="notOriginalImgBx" ref={notOriginalImgRef}>
                <img src={NotOriginal} />
                <span>적녹 색각이상자가 보는 사진</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box2">
          <div className="box2_wrap">
            <div className="box2_wrap_textWrap">
              <div className="box2_text_content">
                <div className="box2_content1">
                  일영일은 RGB 컬러 모델에서 한 단계 더 나아가,
                  <br />
                  HSV를 조절한 영상을 제공함으로써,
                </div>
                <div className="box2_content2">
                  일반적으로 보기 어려운 색상이나 글자도 눈에 띄게 만들어,
                  <br />
                  색각 이상이 있는 사용자가 더욱 풍부한 시각 정보를 받을 수 있는
                  <br />
                  새로운 시각적 경험을 제공합니다.
                </div>
              </div>
            </div>
            <div className="box2_img_wrap">
              <div className="box2_img_bx">
                <img src={Triangle} />
              </div>
            </div>
          </div>
        </div>
        <div className="centerImg">
          <img src={Logo} />
          <div className="centerImg_text">동영상을 알맞게 변환하세요</div>
        </div>
      </div>
      <Ask />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  height: 7500px;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;

  .boardBx {
    box-sizing: border-box;
    display: flex;
    width: 80%;
    position: relative;

    img {
      position: relative;
      width: 100%;
    }

    .textWrap {
      position: absolute;
      top: 50%;
      left: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 60%;

      .textBx1 {
        color: #ff14b1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: 5.5rem; // 미디어 쿼리로 나중에 폰트 사이즈 변경하기
      }

      .textBx2 {
        text-align: center;
        color: #fff;
        margin-top: 40px;
        font-size: 1.5rem;
      }

      .textBx3 {
        cursor: pointer;
        text-align: center;
        color: #fff;
        border-radius: 7px;
        background: rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 20px;
        white-space: nowrap;
        font-size: 1.5rem;
        margin-top: 40px;

        .imgWrap {
          width: 10%;
          margin-left: 10px;

          img {
            width: 100%;
          }
        }
      }
    }
  }

  .spacer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    /* border: 5px solid green; */
    flex-grow: 1;
    position: relative;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
  }

  .chalk {
    position: relative;
    width: 100%;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to top, #fff, transparent);
      z-index: 10000;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 150px;
      background: linear-gradient(to bottom, #e7465c, transparent);
      z-index: 10000;
    }

    img {
      width: 100%;
    }
  }

  .box1 {
    height: 2000px;
    border: 1px solid green;

    .introWrap {
      border: 1px solid black;
      position: sticky;
      top: -50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 1000px;

      .introBx {
        display: inline-flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        position: relative;
        margin-left: 200px;

        .whatIsText {
          font-size: 5em;
          background: #ffef00;
          border-radius: 30px;
          padding: 10px;
        }

        .whatIsTextContent {
          margin-top: 20px;
          font-size: 2.5em;
          line-height: 1.5;
        }
      }

      .colorImgWrap {
        margin-left: 200px;
        position: relative;
        bottom: 160px;

        .originalImgBx {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.5em;
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 2s ease-in-out;
          transform: translateY(0);

          img {
            border-radius: 50px;
          }
        }

        .originalImgBx.visible {
          transform: translateY(-200px);
        }

        .notOriginalImgBx {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.5em;
          position: absolute;
          top: 0;
          left: 0;
          transition: opacity 2s ease-in-out;
          opacity: 0;
          transform: translateY(0);

          img {
            border-radius: 50px;
          }
        }

        .notOriginalImgBx.visible {
          opacity: 1;
          transform: translateY(200px);
        }
      }
    }
  }

  .box2 {
    margin-top: 50px;
    border: 1px dashed red;
    height: 2618px;
    background-color: #fff;
    transition: background-color 0.5s ease-in-out;

    .box2_wrap {
      /* border: 1px solid blue; */
      position: sticky;
      top: 220px;
      display: flex;
      justify-content: space-between;
      height: 60vh;

      .box2_wrap_textWrap {
        display: flex;
        align-items: center;

        .box2_text_content {
          color: #fff;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: start;
          font-size: 2.5em;

          .box2_content1 {
            line-height: 50px;
            position: relative;
            right: 1000px;
            font-size: 2.5rem;
            /* border: 1px solid white; */
            color: #fff;
          }

          .box2_content2 {
            line-height: 50px;
            position: relative;
            right: 1000px;
            font-size: 2.5rem;
            color: #fff;
          }
        }
      }

      .box2_img_wrap {
        margin-right: 100px;
        width: 30vw;
        height: 550px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid yellow; */

        .box2_img_bx {
          width: 400px;
          height: 400px;
          animation: rotate 2s linear 1s infinite;
          /* border: 1px solid green; */

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .box2.visible {
    background-color: #000;

    .box2_content1 {
      animation: slideRight 1s ease-in-out;
      animation-fill-mode: forwards;
    }

    .box2_content2 {
      animation: slideRight 1s 1s ease-in-out;
      animation-fill-mode: forwards;
    }
  }

  .centerImg {
    /* border: 3px solid red; */
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("https://www.nanalyze.com/app/uploads/2019/01/Cure-Color-Blindness-Teaser-1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    margin-top: auto;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }

    img {
      position: relative;
      width: 100px;
    }

    .centerImg_text {
      position: relative;
      font-size: 3em;
      color: #ffef00;
      margin-top: 20px;
    }
  }

  @keyframes slideRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(1050px);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
