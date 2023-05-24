import React from "react";
import styled from "styled-components";
import Header from "./Header";
import BoardImg from "../../assets/HomeBoard.png";

const Home = () => {
  return (
    <Wrap>
      <Header />
      <div className="boardBx">
        <img src={BoardImg} />
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
  justify-content: center;
  align-items: center;

  .boardBx {
    width: 80vw;

    img {
      width: 100%;
    }
  }
`;
