import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TestPage from "../pages/TestPage";
import PreviewPage from "../pages/PreviewPage";
import SettingPage from "../pages/SettingPage";
import HomePage from "../pages/HomePage";
import NaviagationBar from "../components/Navigation/NavigationBar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transition.css";

function TransitionRoutes() {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function RootRoute() {
  return (
    <BrowserRouter>
      {/* <NaviagationBar /> */}
      <TransitionRoutes />
    </BrowserRouter>
  );
}
