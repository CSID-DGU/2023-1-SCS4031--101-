import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function BlindTest() {
  const [saturation1, setSaturation1] = useState(50);
  const [saturation2, setSaturation2] = useState(50);
  const saturation1ForOpenCV = saturation1 * 2.55;
  const saturation2ForOpenCV = saturation2 * 2.55;
  const canvasRef = useRef(null);

  const red1 = 0;
  const red2 = 10;
  const red3 = 305;
  const red4 = 360;
  const cyan1 = 180; // 120?
  const cyan2 = 230; // 240?

  const generateUrl = () => {
    const url = `/video?r1=${red1}&r2=${red2}&r3=${red3}&r4=${red4}&c1=${cyan1}&c2=${cyan2}&s1=${saturation1ForOpenCV}&s2=${saturation2ForOpenCV}`;
    return encodeURI(url);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "../image/test1.jpg";
    /*
    image.src = "../image/test2.jpg";
    image.src = "../image/test3.jpg";
    */

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
      <canvas ref={canvasRef} />
      <br />
      <label>
        빨강:
        <input
          type="range"
          min="0"
          max="100"
          value={saturation1}
          onChange={updateSaturation1}
        />
      </label>
      <br />
      <label>
        청록:
        <input
          type="range"
          min="0"
          max="100"
          value={saturation2}
          onChange={updateSaturation2}
        />
      </label>
      <br />
      <Link to={generateUrl()}>
        <button>video</button>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.div`
  canvas {
    width: 90vw;
    height: 60vh;
  }
`;
