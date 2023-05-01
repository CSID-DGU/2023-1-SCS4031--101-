import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <Wrap>
      <div className="buttonBox">
        <Link
          to="/blindtest"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button className="test">Test</button>
        </Link>
        <Link to="/video" style={{ textDecoration: "none", color: "inherit" }}>
          <button className="video">Video</button>
        </Link>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .buttonBox {
    border: 1px solid black;
    position: relative;
    width: 40em;
    height: 20em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttonBox button {
    margin: 10px;
  }
`;
