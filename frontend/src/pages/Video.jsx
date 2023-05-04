import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Video() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch("http://127.0.0.1:5000/opencv");
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    }
    fetchImage();
  }, []);

  return (
    <Wrap>
      {image ? (
        <img src="http://127.0.0.1:5000/opencv" alt="image" />
      ) : (
        <p>Loading...</p>
      )}
    </Wrap>
  );
}

const Wrap = styled.div``;
