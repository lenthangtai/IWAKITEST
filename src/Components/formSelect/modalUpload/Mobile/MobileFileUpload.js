import React, { useState, useRef, useEffect, useCallback } from "react";
import UploadImagesvg from "../../../../Images/Upload image (2).svg";
import { Checkbox, Col, Row } from "antd";
import { EditOutlined } from "@mui/icons-material";
import axios from "axios";
import './MobileFileUpload.css';

export default function MobileFileUpload() {
  // const [imgSrc, setImgSrc] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  // const [selectedFile, setSelectedFile] = useState(
  //   localStorage.getItem("ImageUpdate")
  // );

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      var retrievedImageInfo = JSON.parse(storedImage);
      setImageUrl(retrievedImageInfo.imageBase64);
    }
    // debugger

    // if (!selectedFile) {
    //   setPreview(undefined);
    //   return;
    // }
    // const objectUrl = URL.createObjectURL(selectedFile);
    // setPreview(objectUrl);
    // return () => URL.revokeObjectURL(objectUrl);
  }, [imageUrl]);

  const onChangeCheckBox = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const onRemove = () => {
    localStorage.removeItem('uploadedImage');
  }

  // const uploadImage = async () => {
  //   if (imgSrc !== null && imgSrc !== undefined && imgSrc !== "") {
  //     const getFileCapture = localStorage.getItem("ImageData");
  //     const nameFile = localStorage.getItem("fileName");

  //     const byteCharacters = atob(getFileCapture.split(",")[1]);

  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);

  //     const buffer = byteArray.buffer;

  //     const blob = new Blob([buffer], { type: "image/png" });

  //     const getFile = new File([blob], nameFile, { type: "image/png" });
  //     console.log(getFile);
  //     const prioriti = checked ? "1" : "0";

  //     const FormData = require("form-data");
  //     let data = new FormData();
  //     data.append("file_upload", getFile);
  //     data.append("prioriti", prioriti);
  //     axios
  //       .post("http://192.168.10.22:5009/upload_file", data)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <div className="Mobile-FileUpload">
      <Row style={{ position: "relative", width: "100%", height: "100svh" }}>
        <img
          src={imageUrl}
          alt=""
          style={{ width: "100%", height: "99svh" }}
        ></img>
      </Row>
      <Row
        style={{
          height: "20svh",
          position: "fixed",
          bottom: 0,
          zIndex: 10,
          background: "#0000001c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            className="btnUpload"
            src={UploadImagesvg}
            alt="UploadImagesvg"
            // onClick={uploadImage}
            style={{ width: "65%" }}
          />
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox onChange={onChangeCheckBox} checked={checked}></Checkbox>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Col>
      </Row>
    </div>
  );
}
