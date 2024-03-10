import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import MobileWebCam from "./Mobile";
import WindowCamera from "./Window";

export default function CameraForm() {
  const isMobile = window.innerWidth <= 1024;

  return <>{isMobile ? <MobileWebCam /> : <WindowCamera />}</>;
}
