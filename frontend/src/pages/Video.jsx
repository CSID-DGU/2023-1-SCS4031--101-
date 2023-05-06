import React, { useEffect } from "react";
import styled from "styled-components";

export default function Video() {
  /*
  const [data, setData] = useState([{}]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/json");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);
   */

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.src = "http://127.0.0.1:5000/opencv";
    imgElement.alt = "Real-time video stream";
    const wrapElement = document.querySelector("#video-wrap");
    wrapElement.appendChild(imgElement);

    return () => {
      // Clean up when the component is unmounted
      wrapElement.removeChild(imgElement);
    };
  }, []);

  return (
    <Wrap>
      {/*
      <div>
        {typeof data.CorrectionArray === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.CorrectionArray.map((value, i) => <p key={i}>{value}</p>)
        )}
      </div>
       */}
      <div id="video-wrap"></div>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
