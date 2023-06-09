import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Convert from "../assets/Convert.png";

const SavedVideo = () => {
  const fileInputRef = useRef(null);
  const [showConvertButton, setShowConvertButton] = useState(false);

  // URL의 쿼리 파라미터에서 보정 값 읽기
  const location = useLocation();
  const [colorSettings, setColorSettings] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setColorSettings({
      r1: params.get("r1"),
      r2: params.get("r2"),
      p1: params.get("p1"),
      p2: params.get("p2"),
      c1: params.get("c1"),
      c2: params.get("c2"),
      s1: params.get("s1"),
      s2: params.get("s2"),
    });
  }, [location]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/upload_video",
          data
        );
        alert("업로드가 완료되었습니다!");
        setShowConvertButton(true);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleConvertClick = async () => {
    const filename = fileInputRef.current.files[0].name;

    // colorSettings 값 출력
    console.log("colorSettings:", colorSettings);

    try {
      const response = await axios.post("http://127.0.0.1:5000/convert_video", {
        filename: filename,
        colorSettings: colorSettings,
      });
      alert("변환 완료!");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrap>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="video/*" //비디오 파일만 업로드 가능
        onChange={handleFileChange}
      />
      <div className="uploadText">업로드할 동영상을 선택해주세요</div>
      <div className="uploadBx">
        <button onClick={handleUploadClick}>업로드</button>
      </div>
      {showConvertButton && (
        <div className="btnWrap" onClick={handleConvertClick}>
          <img src={Convert} />
        </div>
      )}
    </Wrap>
  );
};

export default SavedVideo;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;

  .uploadText {
    position: absolute;
    top: 50px;
    font-size: 3.7em;
    color: white;
  }

  .uploadBx {
    width: 200px;
    height: 200px;
    /* border: 1px solid white; */
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 60%;
      height: 20%;
    }
  }

  .btnWrap {
    /* border: 1px solid white; */
    position: absolute;
    bottom: 50px;
    width: 200px;
    cursor: pointer;
    animation: fadeIn 1s ease-in-out;

    img {
      width: 100%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;
