import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Convert from "../assets/Convert.png";

const SavedVideo = () => {
  const fileInputRef = useRef(null);
  const [showConvertButton, setShowConvertButton] = useState(false);

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
        <div className="btnWrap">
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
