import {
  Button,
  Col,
  Grid,
  Modal,
  Row,
  Typography,
  Upload,
  message,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MobileWebCam from "../Camera/Mobile";
import WindowCamera from "../Camera/Window";
import App from "../../App";
import { Content } from "antd/es/layout/layout";
import MobileFileUpload from "./modalUpload/Mobile/MobileFileUpload";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function FormSelect32() {
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const isMobile = window.innerWidth <= 1024;
  const [imageUrl, setImageUrl] = useState(null);

  const showModal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  // const handleChange = (info) => {
  //   let newFileList = [...info.fileList];
  //   newFileList = newFileList.slice(-2);

  //   newFileList = newFileList.map((file) => {
  //     if (file.response) {
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });
  //   setFileList(newFileList);
  // };
  // const props = {
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  //   onChange: handleChange,
  //   multiple: true,
  // };

  const uploadProps = {
    name: "file",
    showUploadList: false,
    multiple: false,
    beforeUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isJPEG = file.type === "image/jpeg";
      const isTIF = file.type === "image/tif";

      if (!isPNG && !isJPG && !isJPEG && !isTIF) {
        message.error(`${file.name} is not a Image file`);
      } else {
        return isPNG || isJPEG || isJPG || isTIF;
      }
    },
    onChange(info) {
      const newFile = info.file.originFileObj;
      console.log(newFile);
      setImage(newFile);

      // localStorage.setItem("ImageUpdate", newFile);
      // localStorage.setItem("Name-UploadedImage",newFile.name);
      const reader = new FileReader();
      // const imageBase64 = reader.target.result;
      console.log(reader);
      reader.onload = (e) => {
        const imageBase64 = e.target.result;
        // localStorage.setItem("uploadedImage",imageBase64);
        // setImageUrl(imageBase64);
        var imageInfo = {
          imageName: newFile.name,
          imageBase64: imageBase64,
        };
        var jsonImageInfo = JSON.stringify(imageInfo);
        localStorage.setItem("uploadedImage", jsonImageInfo);
        // message.success("Tải lên thành công!");
      };

      reader.readAsDataURL(newFile);

      // setOpenModal(true);
    },
  };

  const customRequest = ({ file, onSuccess }) => {
    // Simulate upload success after 2 seconds
    // try {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     console.log(e.target.result);
    //     const imageBase64 = e.target.result;
    //     localStorage.setItem("uploadedImage", imageBase64);
    //     setImageUrl(imageBase64);
    //     message.success("Tải lên thành công!");
    //   };
    //   reader.readAsDataURL(file);
    // } catch (error) {
    //   console.error("Lỗi khi xử lý tập tin:", error);
    //   message.error("Đã xảy ra lỗi khi xử lý tập tin.");
    // }
    setTimeout(() => {
      // message.success("Upload successfully");
      onSuccess("ok");
      window.location.href = window.location.origin + "/ViewImage";
    }, 2000);
  };
  const onChangeImage = () => {
    console.log(image);
  };
  // const onChangeUploadImage = (info) => {
  //   debugger;
  //   const newFile = info.file.originFileObj;
  //   setImage(newFile);
  //   return <MobileFileUpload imgSrc={newFile} />;
  // };
  const onChangeUpload = (info) => {
    if (info.file.status === "done") {
      const newFile = info.file.originFileObj;
      setImage(newFile);
      window.location.href = `/ViewImage?imgSrc=${image}`;
    }
  };

  // const customRequest = ({ file, onSuccess, onError }) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "http://192.168.20.162:1111/api/import-img/",
  //       data: formData,
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   // axios
  //   //   .post("YOUR_UPLOAD_API_ENDPOINT", formData)
  //   //   .then((response) => {
  //   //     onSuccess(response.data, file);
  //   //   })
  //   //   .catch((error) => {
  //   //     onError(error);
  //   //   });
  // };
  const uploadImage = async () => {
    // if (imgSrc !== null && imgSrc !== undefined && imgSrc !== "") {

    const getFileCapture = localStorage.getItem("ImageData");
    const nameFile = localStorage.getItem("fileName");

    const byteCharacters = atob(getFileCapture.split(",")[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const buffer = byteArray.buffer;

    const blob = new Blob([buffer], { type: "image/png" });

    const getFile = new File([blob], nameFile, { type: "image/png" });
    console.log(getFile);

    const FormData = require("form-data");
    let data = new FormData();
    data.append("file_upload", getFile);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://192.168.20.162:1111/api/import-img/",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };
  const handleChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Set the uploaded image to the state
      setImage(info.file.originFileObj);
      setOpenModal(true);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <Content style={{ width: "70%", margin: "20% auto 0px" }}>
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Link to="/CaptureCamera">
              <Button icon={<UploadOutlined />}>Capture</Button>
            </Link>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col className="btnUploadFile" span={24}>
            <Upload
              {...uploadProps}
              fileList={[]}
              listType="picture"
              accept=".png,.jpg,.jpeg,.tif"
              capture={false}
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Col>
        </Row>
        {/* <Row style={{ width: "100%" }}>
          <Col className="btnUploadFile" span={24}>
            <Button icon={<UploadOutlined />}>Preview Image</Button>
          </Col>
        </Row> */}
      </Content>

      {/* <Modal open={openModal} x onCancel={handleCancel} footer={null}>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            style={{ marginTop: "10px", maxWidth: "100%" }}
          />
        )}
      </Modal> */}
    </>
  );
}
