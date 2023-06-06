import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TestPage from "../pages/TestPage";
import PreviewPage from "../pages/PreviewPage";
import SettingPage from "../pages/SettingPage";
import HomePage from "../pages/HomePage";
import VideoSelectPage from "../pages/VideoSelectPage";
import VideoPage from "../pages/VideoPage";
import SavedVideo from "../components/SavedVideo";
import HomeBtn from "../components/homeBtn/HomeBtn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transition.css";

function TransitionRoutes() {
  let location = useLocation();

  return (
    <>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/videoselect" element={<VideoSelectPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/savedvideo" element={<SavedVideo />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {/* Conditionally render HomeBtn based on the location */}
      {location.pathname !== "/" && location.pathname !== "/home" && (
        <HomeBtn />
      )}
    </>
  );
}

export default function RootRoute() {
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}
