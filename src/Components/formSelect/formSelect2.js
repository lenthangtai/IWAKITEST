import React, { useState } from "react";
import "./formSelect2.css";
import logoIwaki from "../../Images/LogoIwaki.svg";
import BackgroundIconVector from "../../Images/BackgroundIconVector.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Checkbox, Col, Modal, Row, Upload, message } from "antd";

export default function FormSelect2() {
  const [imageList, setImageList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState(["LK"]);
  const [selectedValue, setSelectedValue] = useState(null);

  const userInfo = useSelector((state) => state.user);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setImageList([]);
    setOpenModal(false);
  };
  const onChangeCheckBox = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleDeleteImage = (imageName) => {
    // Filter out the image with the given imageName
    const updatedImageList = imageList.filter(
      (image) => image.imageName !== imageName
    );
    setImageList(updatedImageList);
  };

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
    setTimeout(() => {
      setOpenModal(true);
    }, 1000);
  };
  const multiUploadImage = async () => {
    console.log(selectedValue);
    const prioriti = checked ? "1" : "0";
    const FormData = require("form-data");
    let data = new FormData();
    data.append("prioriti", prioriti);
    data.append("id_user", userInfo.user_id);
    data.append("type_upload", "2");
    data.append("pumb_model", "LK");
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
        console.log(error);
      });
  };

  return (
    <>
      <div className="FormSelect">
        <div className="logoIwaki">
          <img src={logoIwaki} />
        </div>
        <div className="button-select">
          <button className="btnSelectCapture">
            <p className="textCapture">Capture</p>
          </button>
          <Upload
            {...uploadProps}
            fileList={[]}
            listType="picture"
            accept=".png,.jpg,.jpeg,.tif"
            capture={false}
            customRequest={customRequest}
          >
            <button className="btnSelectUpload">
              <p className="textUpload">Upload File</p>
            </button>
          </Upload>
          <Modal
            className="ModalShowImage"
            open={openModal}
            onCancel={handleCancel}
            footer={null}
          >
            {imageList.map((image) => (
              <div></div>
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
                    // src={UploadImagesvg}
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
          <button className="btnSelectManager">
            <p className="textFileManager">File Manager</p>
          </button>
        </div>
        <div className="imageNenVector">
          <img src={BackgroundIconVector} />
        </div>
      </div>
    </>
  );
}
