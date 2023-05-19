import React from "react";
import styled from "styled-components";

const Setting = () => {
  return (
    <Wrap>
      <div className="text">알맞은 색상 수치를 설정해주세요</div>
      <div className="textWrap"></div>
    </Wrap>
  );
};

export default Setting;

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
    /* border: 1px solid black; */
    color: #fff;
    font-size: 4vw;
    padding-bottom: 50px;
  }

  .textWrap {
    background: #fff;
    border-radius: 40px;
    width: 30vw;
    height: 70vh;
  }
`;
