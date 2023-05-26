import React from "react";
import styled from "styled-components";
import Header from "./Header";
import BoardImg from "../../assets/HomeBoard.png";
import ConvertImg from "../../assets/ConvertImg.png";

const Home = () => {
  return (
    <Wrap>
      <Header />
      <div className="boardBx">
        <img src={BoardImg} />
        <div className="textWrap">
          <div className="textBx1">
            <div>색각 이상자를 위한</div>
            <div>비디오 변환 서비스입니다</div>
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
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .boardBx {
    display: flex;
    width: 80vw;
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
`;
