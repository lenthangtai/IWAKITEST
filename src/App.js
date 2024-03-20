import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login2 from "./Components/Login/Login2";
import FormSelect2 from "./Components/formSelect/formSelect2";
import CameraForm from "./Components/Camera/cameraForm";
import MobileWebCam2 from "./Components/Camera/Mobile/CameraMobile";
import Main from "./Components/Router/Router";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormSelect2 />} />
          <Route path="/Login" element={<Login2 />} />
          <Route path="/FormSelect" element={<FormSelect2 />} />
          <Route path="/CaptureCamera" element={<CameraForm />} />
        </Routes>
      </BrowserRouter>
  );
}
