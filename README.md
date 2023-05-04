# 프로젝트 소개

주제 : 색각 이상자의 접근성을 개선하는 실시간 영상 보정 서비스

내용 : 웹캠으로 촬영중인 영상에 있어서, HSV(혹은 RGB)색공간에 대하여 사용자의 상황에 따른 보정치를 적용하여, 실시간으로 OpenCV에 의한 색상 보정 기능을 제공. +한길깃허브테스트 +영훈깃헙


useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    async function fetchData() {
      const response = await fetch("http://localhost:5000/test");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    async function fetchData() {
      const response = await fetch("http://localhost:5000/test");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [value, setValue] = useState(100);

  const updateHue = (e) => {
    setHue(e.target.value);
  };

  const updateSaturation = (e) => {
    setSaturation(e.target.value);
  };

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const getFilterStyle = () => {
    return `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${value}%)`;
  };

  return (
    <Wrap>
      <div>
        {typeof data.CorrectionArray === "undefined" ? (
          <p>Loading...!</p>
        ) : (
          data.CorrectionArray.map((value, i) => <p key={i}>{value}</p>)
        )}
      </div>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ishihara_9.svg/1200px-Ishihara_9.svg.png"
        style={{ filter: getFilterStyle() }}
      />
      <br />
      <label>
        H:
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={updateHue}
        />
      </label>
      <br />
      <label>
        S:
        <input
          type="range"
          min="0"
          max="200"
          value={saturation}
          onChange={updateSaturation}
        />
      </label>
      <br />
      <label>
        V:
        <input
          type="range"
          min="0"
          max="200"
          value={value}
          onChange={updateValue}
        />
      </label>
    </Wrap>
  );
}

const Wrap = styled.div`
  img {
    width: 30vw;
    height: 60vh;
  }
`;






