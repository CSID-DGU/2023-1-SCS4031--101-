import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlindTest from "../pages/Blindtest";
import MainPage from "../pages/MainPage";
import Video from "../pages/Video";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blindtest" element={<BlindTest />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}
