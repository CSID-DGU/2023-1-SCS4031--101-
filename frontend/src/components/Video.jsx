import styled from "styled-components";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Video = () => {
  // const location = useLocation();
  // const imgURL = location.state.url;

  // useEffect(() => {
  //   const videoElement = document.querySelector(".videoBx");
  //   const imgElement = document.createElement("img");

  //   imgElement.src = imgURL;
  //   imgElement.alt = "변환된 동영상";
  //   imgElement.style.width = "100%";
  //   imgElement.style.height = "100%";

  //   videoElement.appendChild(imgElement);

  //   // Cleanup function to remove the image when the component is unmounted
  //   return () => videoElement.removeChild(imgElement);
  // }, [imgURL]);

  return (
    <Wrap>
      <div className="box">
        <div className="videoBx">변환된 동영상</div>
      </div>
    </Wrap>
  );
};

export default Video;

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

  .box {
    background: #fff;
    position: absolute;
    inset: 100px 250px;
    border-radius: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .videoBx {
      position: relative;
      border: 1px solid black;
      width: 80%;
      height: 80%;
    }
  }
`;

// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";

// export default function Video() {
//   const location = useLocation();

//   useEffect(() => {
//     const imgElement = document.createElement("img");
//     imgElement.src = "http://127.0.0.1:5000/opencv";
//     imgElement.alt = "Real-time video stream";
//     const wrapElement = document.querySelector("#video-wrap");
//     wrapElement.appendChild(imgElement);

//     return () => {
//       // Clean up when the component is unmounted
//       wrapElement.removeChild(imgElement);
//     };
//   }, []);

//   return (
//     <Wrap>
//       <div id="video-wrap"></div>
//     </Wrap>
//   );
// }

// const Wrap = styled.div`
//   padding: 0;
//   margin: 0;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
