import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Video from "../pages/Video";
import Home from "../pages/Home";
import TestPage from "../pages/TestPage";
import Preview from "../pages/Preview";
import Set from "../pages/Set";
import Header from "../components/header/Header";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <RoutesWithHeader />
    </BrowserRouter>
  );
}

function RoutesWithHeader() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/preview" element={<Preview />} />
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/video" element={<Video />} />
        <Route path="/set" element={<Set />} />
      </Routes>
    </>
  );
}
