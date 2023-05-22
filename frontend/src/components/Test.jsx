import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import preBtn from "../assets/Pre.png";
import nextBtn from "../assets/Next.png";

export default function BlindTest() {
  const [saturation1, setSaturation1] = useState(127);
  const [saturation2, setSaturation2] = useState(127);
  const canvasRef = useRef(null);

  const red1 = 0;
  const red2 = 10;
  const red3 = 305;
  const red4 = 360;
  const cyan1 = 180; // 120?
  const cyan2 = 230; // 240?

  const generateUrl = () => {
    const url = `/video?r1=${red1}&r2=${red2}&r3=${red3}&r4=${red4}&c1=${cyan1}&c2=${cyan2}&s1=${saturation1}&s2=${saturation2}`;
    return encodeURI(url);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "../image/Ishihara.png";

    const renderImage = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      ctx.canvas.willReadFrequently = true; // willReadFrequently 속성 추가

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert RGB to HSV
        let h, s, v;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;

        if (max === min) {
          h = 0;
        } else if (max === r) {
          h = (60 * ((g - b) / diff) + 360) % 360;
        } else if (max === g) {
          h = (60 * ((b - r) / diff) + 120) % 360;
        } else {
          h = (60 * ((r - g) / diff) + 240) % 360;
        }

        v = max / 255;
        s = max === 0 ? 0 : diff / max;

        if ((h >= red1 && h <= red2) || (h >= red3 && h <= red4)) {
          s *= saturation1 / 100;
        } else if (h >= cyan1 && h <= cyan2) {
          s *= saturation2 / 100;
        }

        // Convert HSV back to RGB
        const hi = Math.floor(h / 60) % 6;
        const f = h / 60 - Math.floor(h / 60);
        const p = v * (1 - s) * 255;
        const q = v * (1 - f * s) * 255;
        const t = v * (1 - (1 - f) * s) * 255;

        if (hi === 0) {
          data[i] = v * 255;
          data[i + 1] = t;
          data[i + 2] = p;
        } else if (hi === 1) {
          data[i] = q;
          data[i + 1] = v * 255;
          data[i + 2] = p;
        } else if (hi === 2) {
          data[i] = p;
          data[i + 1] = v * 255;
          data[i + 2] = t;
        } else if (hi === 3) {
          data[i] = p;
          data[i + 1] = q;
          data[i + 2] = v * 255;
        } else if (hi === 4) {
          data[i] = t;
          data[i + 1] = p;
          data[i + 2] = v * 255;
        } else {
          data[i] = v * 255;
          data[i + 1] = p;
          data[i + 2] = q;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    image.onload = renderImage;
    // renderImage(); // Render image initially

    return () => {
      image.onload = null; // Cleanup
    };
  }, [saturation1, saturation2]);

  const updateSaturation1 = (e) => {
    setSaturation1(e.target.value);
    // console.log(`saturation1: ${e.target.value}`);
  };

  const updateSaturation2 = (e) => {
    setSaturation2(e.target.value);
    // console.log(`saturation2: ${e.target.value}`);
  };

  return (
    <Wrap>
      <div className="text">
        본인에게 맞는 색상 수치를
        <br />
        선택해주세요
      </div>
      <div className="whiteBox">
        <canvas ref={canvasRef} />
        <br />
        <label>
          <div className="inputBx">
            <input
              className="silder1"
              type="range"
              min="0"
              max="255"
              value={saturation1}
              onChange={updateSaturation1}
            />
            <span id="rangeValue1">{saturation1}</span>
          </div>
        </label>
        <br />
        <label>
          <div className="inputBx">
            <input
              className="silder2"
              type="range"
              min="0"
              max="255"
              value={saturation2}
              onChange={updateSaturation2}
            />
            <span id="rangeValue2">{saturation2}</span>
          </div>
        </label>
        <br />
        <div className="btnBx">
          <Link to="/preview">
            <div className="preBx">
              <img src={preBtn} />
            </div>
          </Link>
          {/* <Link to={generateUrl()}> */}
          <Link to="/set">
            <div className="nextBx">
              <img src={nextBtn} />
            </div>
          </Link>
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
  font-family: "Jua", sans-serif;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);

  .text {
    color: white;
    text-align: center;
    font-size: 3.7em;
    margin-bottom: 20px;
  }

  .whiteBox {
    border: 1px solid white;
    background: rgba(255, 255, 255);
    border-radius: 50px;
    padding: 30px 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    canvas {
      margin-bottom: 30px;
      width: 380px;
      height: 380px;
    }

    .btnBx {
      margin-top: 10px;
      width: 18vw;
      height: 10vh;
      display: flex;

      div {
        display: flex;
        justify-content: center;
        width: 100%;

        img {
          width: 100%;
          height: 70%;
        }
      }
    }
  }

  .inputBx {
    margin-bottom: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), #edf1f4);
    border-radius: 40px;
    box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff;

    .silder1 {
      width: 300px;
      height: 15px;
      appearance: none;
      background: #edf1f4;
      outline: none;
      border-radius: 15px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
        inset 5px 5px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid red;
        box-shadow: -407px 0 0 400px red;
        cursor: pointer;
      }
    }

    .silder2 {
      width: 300px;
      height: 15px;
      appearance: none;
      background: #edf1f4;
      outline: none;
      border-radius: 15px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
        inset 5px 5px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid green;
        box-shadow: -407px 0 0 400px green;
        cursor: pointer;
      }
    }

    #rangeValue1 {
      position: relative;
      text-align: center;
      width: 60px;
      font-size: 1.25em;
      color: #fff;
      background: red;
      margin-left: 15px;
      font-weight: 500;
      border-radius: 25px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 5px rgba(255, 255, 255, 0.25);
    }

    #rangeValue2 {
      position: relative;
      text-align: center;
      width: 60px;
      font-size: 1.25em;
      color: #fff;
      background: green;
      margin-left: 15px;
      font-weight: 500;
      border-radius: 25px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 5px rgba(255, 255, 255, 0.25);
    }
  }
`;
