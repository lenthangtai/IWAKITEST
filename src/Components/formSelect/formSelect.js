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
  Select,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./formSelect.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MobileWebCam from "../Camera/Mobile";
import WindowCamera from "../Camera/Window";
import App from "../../App";
import { Content } from "antd/es/layout/layout";
import MobileFileUpload from "./modalUpload/Mobile/MobileFileUpload";
import UploadImagesvg from "../../Images/Upload image (2).svg";
import { useSelector } from "react-redux";

const { Option } = Select;

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
  // const [image, setImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState(["LK"]);
  const [selectedValue, setSelectedValue] = useState(null);
  const isMobile = window.innerWidth <= 1024;
  const [imageUrl, setImageUrl] = useState(null);

  const userInfo = useSelector((state) => state.user);

  const showModal = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setImageList([""]);
    setOpenModal(false);
  };
  const onChangeCheckBox = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const handleSelectChange = (value) => {
    setSelectedValue(value);
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
    multiple: true,
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result;
        const imageInfo = {
          imageName: newFile.name,
          imageType: newFile.type,
          imageBase64: imageBase64,
        };

        // Assuming you have a state variable named 'imageList'
        // Update the state to add the new imageInfo
        setImageList((prevImageList) => [...prevImageList, imageInfo]);
      };
      reader.readAsDataURL(newFile);
    },
  };

  const customRequest = ({ onSuccess }) => {
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
      // onSuccess("ok");
      // window.location.href = window.location.origin + "/ViewImage";
      setOpenModal(true);
    }, 1000);
  };
  const handleDeleteImage = (imageName) => {
    // Filter out the image with the given imageName
    const updatedImageList = imageList.filter(
      (image) => image.imageName !== imageName
    );
    setImageList(updatedImageList);
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

  const multiUploadImage = async () => {

    console.log(selectedValue);
    const prioriti = checked ? "1" : "0";
    const FormData = require("form-data");
    let data = new FormData();
    data.append("prioriti", prioriti);
    data.append("id_user", userInfo.user_id);
    data.append("type_upload", "2");
    data.append("pumb_model", selectedValue);
    imageList.map((image) => {
      const nameFile = image.imageName;
      const typeFile = image.imageType;
      const getFileBase64 = image.imageBase64;

      const byteCharacters = atob(getFileBase64.split(",")[1]);

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const buffer = byteArray.buffer;

      const blob = new Blob([buffer], { type: typeFile });

      const getFile = new File([blob], nameFile, { type: typeFile });
      console.log(getFile);
      data.append("file_upload", getFile);
    });
    axios
      .post("http://192.168.10.22:5009/upload_file", data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        message(error)
        console.log(error);
      });
  };

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
  return (
    <>
      <Content style={{ width: "70%", margin: "20% auto 0px" }}>
        <Row>
          <Col span={24}>
            <Select
              style={{ width: 200 }}
              placeholder="Select an option"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              {options.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
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

      <Modal
        className="ModalShowImage"
        open={openModal}     
        onCancel={handleCancel}
        footer={null}
      >
        {imageList.map((image) =>(
          <div>
            
          </div>
        ))}


        {imageList.map((image) => (
          <div key={image.imageName}>
            <Row className="modalShowImageImg">
              <img
                style={{ width: "80%" }}
                src={image.imageBase64}
                alt={image.imageName}
              />
            </Row>
            <Row>
              <Col>
                <p>{image.imageName}</p>
              </Col>
              <Col>
                <Button
                  style={{
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: " 1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                  }}
                  type="primary"
                  onClick={() => handleDeleteImage(image.imageName)}
                >
                  DELETE
                </Button>
              </Col>
            </Row>
          </div>
        ))}
        <div className="FooterModal">
          <Row
            style={{
              // height: "20svh",
              // position: "fixed",
              // bottom: 0,
              // zIndex: 10,
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
              {/* <EditOutlined
                  className="btn-Edit-camera"
                  onClick={editImage}
                  style={{ fontSize: "40px", color: "#fff", cursor: "unset" }}
                /> */}
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="btnUpload"
                src={UploadImagesvg}
                alt="UploadImagesvg"
                onClick={multiUploadImage}
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
              <Checkbox
                onChange={onChangeCheckBox}
                checked={checked}
              ></Checkbox>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}
