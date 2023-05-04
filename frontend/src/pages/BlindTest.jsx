import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlindTest() {
  /*
  const [data, setData] = useState([{}]);
<<<<<<< HEAD

  // useEffect(() => {
  //   // 데이터를 가져오는 비동기 함수
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("http://localhost:5000/test");
  //       const jsondata = await response.json();
  //       setData(jsondata);
  //       console.log("data :", data);
  //     } catch (error) {
  //       console.log("error :", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:5000/test",
  //   })
  //     .then((response) => {
  //       setData(response.data);
  //       console.log("data :", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/opencv",
    })
      .then((response) => {
        console.log("Full response:", response); // Add this line to log the entire response object
        setData(response.data);
        console.log("data :", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
=======
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    async function fetchData() {
      const response = await fetch("http://localhost:5000/json");
      const data = await response.json();
      setData(data);
    }
    fetchData();
>>>>>>> d30b737ef3a6aca263bfdf53cd738bf514326443
  }, []);
  */

  /*
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
  */

  return (
    <Wrap>
      {/* 이미지를 표시할 canvas 요소 */}
      <canvas id="canvas"></canvas>

      {/* 슬라이드바 */}
      <input type="range" min="0" max="255" value="128" id="slider"></input>

      {/*
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
      */}

      <Link to="/video" style={{ textDecoration: "none", color: "inherit" }}>
        <button>video</button>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.div`
  img {
    width: 30vw;
    height: 60vh;
  }
`;
