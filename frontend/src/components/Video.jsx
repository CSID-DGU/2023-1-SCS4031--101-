import styled from "styled-components";
import React from "react";
import { useLocation } from "react-router-dom";

const Video = () => {
  const location = useLocation();
  const videoUrl = location.state.url;

  return (
    <Wrap>
      <div className="box">
        <div className="videoBx">
          <img
            src={videoUrl}
            alt="Video"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </Wrap>
  );
};

export default Video;

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

  .box {
    background: #fff;
    position: absolute;
    inset: 100px 250px;
    border-radius: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .videoBx {
      position: relative;
      border: 1px solid black;
      width: 80%;
      height: 80%;
    }
  }
`;
