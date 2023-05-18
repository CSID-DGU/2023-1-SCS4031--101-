import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TestPage from "../pages/TestPage";
import PreviewPage from "../pages/PreviewPage";
import SettingPage from "../pages/SettingPage";
import NaviagationBar from "../components/Navigation/NavigationBar";

export default function RootRoute() {
  return (
    <BrowserRouter>
      {/* <NaviagationBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
