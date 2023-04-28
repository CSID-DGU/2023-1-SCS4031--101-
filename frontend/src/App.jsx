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
