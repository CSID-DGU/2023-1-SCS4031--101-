import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlindTest() {
  const [saturation1, setSaturation1] = useState(100);
  const [saturation2, setSaturation2] = useState(100);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "../image/test3.jpg";

    const renderImage = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

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

        // Apply saturation only to pixels with hue between 0 and 30 or 90 and 150
        if (h >= 0 && h <= 50) {
          s *= saturation1 / 100;
        } else if (h >= 50 && h <= 150) {
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
    renderImage(); // Render image initially

    return () => {
      image.onload = null; // Cleanup
    };
  }, [saturation1, saturation2]);

  const updateSaturation1 = (e) => {
    setSaturation1(e.target.value);
  };

  const updateSaturation2 = (e) => {
    setSaturation2(e.target.value);
  };

  return (
    <Wrap>
      <canvas ref={canvasRef} />
      <br />
      <label>
        S1:
        <input
          type="range"
          min="0"
          max="200"
          value={saturation1}
          onChange={updateSaturation1}
        />
      </label>
      <br />
      <label>
        S2:
        <input
          type="range"
          min="0"
          max="200"
          value={saturation2}
          onChange={updateSaturation2}
        />
      </label>
      <br />
      <Link
        to={`/video?s1=${saturation1}&s2=${saturation2}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button>video</button>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.div`
  canvas {
    width: 30vw;
    height: 60vh;
  }
`;
