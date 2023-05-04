import styled from "styled-components";
/////
import React, { useState, useEffect } from "react";
/////

export default function Video() {
  /////
  const [data, setData] = useState([{}]);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    async function fetchData() {
      const response = await fetch("http://localhost:5000/video");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);
  /////

  return (
    <Wrap>
      <img src="/opencv" />
    </Wrap>
  );
}

const Wrap = styled.div``;
