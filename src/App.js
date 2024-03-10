import React from "react";
import MobileWebCam from "./Components/Camera/Mobile";
import WindowCamera from "./Components/Camera/Window";
import Album from "./Components/ImagePreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CameraForm from "./Components/Camera/cameraForm";
import FormSelect from "./Components/formSelect/formSelect";
import Login2 from "./Components/Login/Login2";
import FormSelect2 from "./Components/formSelect/formSelect2";
// import MobileFileUpload from "./Components/formSelect/modalUpload/Mobile/MobileFileUpload";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login2 />} />
          <Route path="/FormSelect" element={<FormSelect2 />} />
        </Routes>
      </BrowserRouter>
      {/* <Album/> */}
    </div>
  );
}
