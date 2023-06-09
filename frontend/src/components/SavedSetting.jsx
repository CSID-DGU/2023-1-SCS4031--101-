import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import preBtn from "../assets/preBtn.png";
import nextBtn from "../assets/nextBtn.png";

export default function SavedSetting() {
  // red
  const red1 = 0;
  const red2 = 40; // 10?????
  // yellow
  // ㄱㄱㄱㄱㄱ
  const yellow1 = 41;
  const yellow2 = 60;
  // green
  // ㄱㄱㄱㄱㄱ
  const green1 = 61;
  const green2 = 90;
  // cyan
  const cyan1 = 91;
  const cyan2 = 230;
  // navy
  // ㄱㄱㄱㄱㄱ
  const navy1 = 231;
  const navy2 = 270;
  // purple
  //  ㄱㄱㄱㄱㄱ
  const purple1 = 271;
  const purple2 = 290;
  // pink
  const pink1 = 291; // 305?????
  const pink2 = 360;

  const [saturation1, setSaturation1] = useState(1);
  const [saturation2, setSaturation2] = useState(1);
  const canvasRef = useRef(null);

  const generateUrl = () => {
    const url = `/savedvideo?r1=${red1}&r2=${red2}&p1=${pink1}&p2=${pink2}&c1=${cyan1}&c2=${cyan2}&s1=${saturation1}&s2=${saturation2}`;
    return encodeURI(url);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "../image/testPic.png";

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

        if ((h >= red1 && h <= red2) || (h >= pink1 && h <= pink2)) {
          s *= saturation1;
        } else if (h >= cyan1 && h <= cyan2) {
          s *= saturation2;
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
    setSaturation1(parseFloat(e.target.value).toFixed(1));
  };

  const updateSaturation2 = (e) => {
    setSaturation2(parseFloat(e.target.value).toFixed(1));
  };

  return (
    <Wrap>
      <div className="text">
        변환하고 싶은
        <br />
        알맞은 색상 수치를 설정해주세요
      </div>
      <div className="testWrap">
        <canvas className="canvas" ref={canvasRef} />
        <label>
          <div className="box">
            <input
              type="range"
              className="range1"
              min="1"
              max="3"
              step="0.1"
              value={saturation1}
              onChange={updateSaturation1}
            />
            <span id="rangeValue1">{parseFloat(saturation1).toFixed(1)}</span>
          </div>
        </label>
        <br />
        <label>
          <div className="box">
            <input
              type="range"
              className="range2"
              min="1"
              max="3"
              step="0.1"
              value={saturation2}
              onChange={updateSaturation2}
            />
            <span id="rangeValue2">{parseFloat(saturation2).toFixed(1)}</span>
          </div>
        </label>
        <br />
        <div className="btnWrap">
          <div className="btnBx">
            <Link to="/">
              <div className="preWrap">
                <img src={preBtn} />
              </div>
            </Link>
            <Link to={generateUrl()}>
              <div className="nextWrap">
                <img src={nextBtn} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

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
    position: relative;
    text-align: center;
    color: #fff;
    font-size: 3vw;
    padding-bottom: 15px;
  }

  .testWrap {
    background: #fff;
    border-radius: 30px;
    width: 25vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .canvas {
      position: relative;
      padding-bottom: 30px;
    }

    .box {
      position: relative;
      bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), #edf1f4);
      border-radius: 40px;
      box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff;

      .range1 {
        width: 15vw;
        height: 15px;
        appearance: none;
        background: #edf1f4;
        outline: none;
        border-radius: 15px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
          inset 5px 5px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .range1::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #f04a4a;
        box-shadow: -407px 0 0 400px #f04a4a;
      }

      #rangeValue1 {
        position: relative;
        text-align: center;
        width: 60px;
        font-size: 1.25em;
        color: #fff;
        background: #f04a4a;
        margin-left: 15px;
        font-weight: 500;
        border-radius: 25px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
          inset 5px 5px 10px rgba(0, 0, 0, 0.1),
          inset -5px -5px 5px rgba(255, 255, 255, 0.25);
      }

      .range2 {
        width: 15vw;
        height: 15px;
        appearance: none;
        background: #edf1f4;
        outline: none;
        border-radius: 15px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
          inset 5px 5px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .range2::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #1e90ff;
        box-shadow: -407px 0 0 400px #1e90ff;
      }

      #rangeValue2 {
        position: relative;
        text-align: center;
        width: 60px;
        font-size: 1.25em;
        color: #fff;
        background: #1e90ff;
        margin-left: 15px;
        font-weight: 500;
        border-radius: 25px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff,
          inset 5px 5px 10px rgba(0, 0, 0, 0.1),
          inset -5px -5px 5px rgba(255, 255, 255, 0.25);
      }
    }

    .btnBx {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      bottom: 20px;

      .preWrap {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        img {
          width: 70%;
        }
      }

      .nextWrap {
        width: 100%;
        display: flex;

        img {
          width: 70%;
        }
      }
    }

    canvas {
      width: 25vw;
      /* height: 60vh; */
    }
  }
`;
