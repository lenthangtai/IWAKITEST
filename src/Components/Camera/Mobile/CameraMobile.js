import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import "./CameraMobile.css";
import { Col, Row, Checkbox, Button, Modal } from "antd";
import { SyncOutlined, EditOutlined } from "@ant-design/icons";
import SwipeableViews from "react-swipeable-views";
import UploadImagesvg from "../../../Images/Upload image (2).svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import iconUpload from "../../../Images/uploadPhotosLinear.svg";
import iconImportant from "../../../Images/prioritizeLinear.svg";
import iconClose from "../../../Images/iconClose.svg";
import { localhost } from "../../../server";
import iconUploadActive from "../../../Images/uploadPhotosLinearHover.svg";
import iconImportantActive from "../../../Images/prioritizeBoad.svg";
import withReactContent from "sweetalert2-react-content";
import iconSuccess from "../../../Images/iconComplete.svg";
import arrowBack from "../../../Images/arrowBack.svg";
import iconLoading from "../../../Images/iconLoading.svg";
import BackgroundIconVector from "../../../Images/BackgroundIconVector.svg";

import Swal from "sweetalert2";
import ModalCheckImage from "../../formSelect/modalUpload/ModalCheckImage";
const MySwal = withReactContent(Swal);
const MobileWebCam2 = () => {
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  const [checkImg, setCheckImg] = useState(false);
  const [checked, setChecked] = useState(false);
  const [disabledApp, setDisabledApp] = useState(true);

  const [imageList, setImageList] = useState([]);
  const userInfo = useSelector((state) => state.user);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalDeleteImage, setIsModalDeleteImage] = useState(false);
  const [isPrioritize, setIsPrioritize] = useState(false);

  // const constraints = {
  //   video: {
  //     facingMode: facingMode,
  //     width: { ideal: 1920 },
  //     height: { ideal: 1080 },
  //   },
  //   audio: false,
  // };
  const constraints = {
    video: {
      facingMode: facingMode,
    },
    audio: false,
  };
  // useEffect(()=>{
  //   const mediaStream = navigator.mediaDevices.getUserMedia(
  //     constraints
  //   );
  // },[setIsModalImageVisible])

  useEffect(() => {
    console.log(constraints);
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        //  const mediaStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            if (canvasRef.current) {
              // Get actual video dimensions
              const actualWidth = videoRef.current.videoWidth;
              const actualHeight = videoRef.current.videoHeight;

              // Get video stream settings
              const track = mediaStream.getVideoTracks()[0];
              const settings = track.getSettings();
              const { width, height } = settings;

              // Calculate aspect ratio
              const aspectRatio = width / height;

              // Adjust canvas size based on aspect ratio
              if (aspectRatio > 1) {
                canvasRef.current.width = actualWidth;
                canvasRef.current.height = actualWidth / aspectRatio;
              } else {
                canvasRef.current.width = actualHeight * aspectRatio;
                canvasRef.current.height = actualHeight;
              }
            }
          };
          navigator.mediaDevices.enumerateDevices().then((devices) => {
            const hasFrontCamera = devices.some(
              (device) =>
                (device.kind === "videoinput" &&
                  device.label.toLowerCase().includes("front")) ||
                device.label.toLowerCase().includes("trước")
            );
            const hasBackCamera = devices.some(
              (device) =>
                (device.kind === "videoinput" &&
                  device.label.toLowerCase().includes("back")) ||
                device.label.toLowerCase().includes("sau")
            );
            if (
              (isFrontCamera && !hasBackCamera) ||
              (!isFrontCamera && !hasFrontCamera)
            ) {
              const newFacingMode = "user";
              setFacingMode(newFacingMode);
            }
            setDisabledApp(false);
          });
        }
      } catch (err) {
        alert("Không tìm thấy camera");
        window.location.href = "/";
        setDisabledApp(true);
        // console.error("Error accessing the camera:", err);
      }
    };
    if (isModalImageVisible === false) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [facingMode, checkImg, isModalImageVisible]);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handleCancel = () => {
    setIsModalImageVisible(false);
    setIsPrioritize(false);
    setIsChoose(false);
    onClickCancelCheckImage();
  };

  const showModalDelete = () => {
    setIsModalDeleteImage(true);
  };
  const handleDeleteOK = () => {
    setIsModalDeleteImage(false);
  };
  const buttonPrioritize = () => {
    isPrioritize ? setIsPrioritize(false) : setIsPrioritize(true);
    // setIsPrioritize(true);
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteImage(false);
  };
  const onClickCheckImage = (imageName) => {
    if (isChoose) {
      const updatedImages = imageList.map((image) =>
        image.imageName === imageName
          ? { ...image, imageCheck: !image.imageCheck }
          : { ...image }
      );
      setImageList(updatedImages);
    }
  };
  const countCheckedImages = () => {
    return imageList.filter((image) => image.imageCheck).length;
  };
  const handleDeleteImagesOk = () => {
    const updatedImages = imageList.filter((image) => !image.imageCheck);
    setImageList(updatedImages);
    setIsModalDeleteImage(false);
    if (imageList.length === 0) {
      setIsModalImageVisible(false);
    }
  };
  useEffect(() => {
    if (imageList.length === 0) {
      setIsModalImageVisible(false);
    }
  }, [imageList]);

  const showModal = () => {
    setIsModalImageVisible(true);
  };

  const captureImage = () => {
    try {
      if (isSwitchingCamera) {
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        if (facingMode === "user") {
          context.scale(-1, 1);
          context.translate(-canvas.width, 0);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.restore();
        const imageData = canvas.toDataURL("image/png", 1);

        const now = new Date();

        const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const month =
          now.getMonth() + 1 < 10
            ? `0${now.getMonth() + 1}`
            : now.getMonth() + 1;
        const year = String(now.getFullYear()).slice(-2);
        const hours =
          now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        const minutes =
          now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const seconds =
          now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
        const milliseconds = now.getMilliseconds();

        const formattedDateTime = `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;

        const imageInfo = {
          imageName: `ImageCapture_${formattedDateTime}.png`,
          imageType: "image/png",
          imageBase64: imageData,
        };
        setImageList((prevImageList) => [...prevImageList, imageInfo]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangeCheckBox = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const switchCamera = useCallback(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const hasFrontCamera = devices.some(
          (device) =>
            (device.kind === "videoinput" &&
              device.label.toLowerCase().includes("front")) ||
            device.label.toLowerCase().includes("trước")
        );
        const hasBackCamera = devices.some(
          (device) =>
            (device.kind === "videoinput" &&
              device.label.toLowerCase().includes("back")) ||
            device.label.toLowerCase().includes("sau")
        );

        if (
          (isFrontCamera && !hasBackCamera) ||
          (!isFrontCamera && !hasFrontCamera)
        ) {
          // alert("Không có camera để đổi");
          return;
        }
        setIsFrontCamera((prev) => !prev);
        if (videoRef.current) {
          setIsSwitchingCamera(true);
          setFacingMode(facingMode === "environment" ? "user" : "environment");
          setTimeout(() => {
            setIsSwitchingCamera(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error enumerating devices:", error);
      });
    setTimeout(() => {
      document.activeElement.blur();
    }, 600);
  });
  const handleDeleteImages = () => {
    showModalDelete();
  };
  const editImage = () => {
    setCheckImg(false);
  };
  const [checkedTime, setCheckedTime] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const [isChoose, setIsChoose] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const items2 = useState(sessionStorage.getItem("OptionMaChine"));
  const [isModalQuestion, setIsModalQuestion] = useState(false);
  const closeModalQuestion = () => {
    setIsModalQuestion(false);
  };
  const showModalCheckImage = () => {
    if (imageList.length > 3) {
      setShowModalUpload(false);
      setIsModalQuestion(true);
    } else if (imageList.length < 3) {
      setShowModalUpload(false);
      setIsModalQuestion(true);
    } else {
      multiUploadImage();
    }
  };

  const multiUploadImage = async () => {
    setIsModalQuestion(false);
    setShowModalUpload(false);
    try {
      debugger;
      if (items2 !== null) {
        setCheckedTime(false);
        const prioriti = isPrioritize ? "1" : "0";
        const FormData = require("form-data");
        let data = new FormData();
        data.append("prioriti", prioriti);
        data.append("id_user", userInfo.user_id);
        data.append("type_upload", "2");
        data.append("pumb_model", items2);
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
          .post(`${localhost}upload_file`, data)
          .then((response) => {
            setCheckedTime(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("null");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (checkedTime === true) {
      setCheckedTime(null);
      MySwal.fire({
        iconHtml: <img src={iconSuccess} />,
        title: "Hoàn thành !!",
        customClass: "custome-success",
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: "custome-form-success",
          icon: "custome-class-success",
          title: "custome-title-success",
        },
      });
      setImageList([]);
      setIsModalImageVisible(false);
      setIsUpdating(false);
      setIsPrioritize(false);
    } else if (checkedTime === false) {
      setCheckedTime(null);
      MySwal.fire({
        iconHtml: <img src={iconLoading} />,
        title: "Đang upload toàn bộ ảnh",
        showConfirmButton: false,
        timer: 2000000,
        allowOutsideClick: false,
        customClass: {
          popup: "custome-form-loading",
          icon: "custome-class-loading",
          title: "custome-title-loading",
        },
      });
      setIsUpdating(true);
    }
  }, [checkedTime]);
  const onClickCancelCheckImage = () => {
    const updatedImages = imageList.map((image) =>
      image.imageCheck === true ? { ...image, imageCheck: false } : { ...image }
    );
    setImageList(updatedImages);
  };

  const onClickChooseAllImage = () => {
    console.log(imageList);
    const updatedImages = imageList.map((image) =>
      image.imageCheck === false ? { ...image, imageCheck: true } : { ...image }
    );
    setImageList(updatedImages);
  };
  const clickChooseImageDelete = () => {
    setIsChoose(!isChoose);
    if (isChoose) {
      setIsChoose(false);
      onClickCancelCheckImage();
    } else {
      setIsChoose(true);
    }
  };
  const openModalUpload = () => {
    setShowModalUpload(true);
  };
  const closeModalUpload = () => {
    setShowModalUpload(false);
  };
  const buttonIconBack = () => {
    window.location.href = "/";
  };

  return (
    <>
      {isModalImageVisible ? (
        <div className="FormSelect">
          <div className="imageNenVectorFormSelect">
            <img src={BackgroundIconVector} />
          </div>
        </div>
      ) : (
        <div className="CameraDesign">
          <div className="CameraVideoDesign">
            <div className="titleCameraDesign">
              <button className="buttonBack" onClick={buttonIconBack}>
                <img className="imageIconBack" src={arrowBack} />
              </button>
            </div>
            <video
              className="VideoDesign"
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                transform: facingMode === "user" ? "scaleX(-1)" : "none",
              }}
            >
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </video>
            <div className="FooterCameraDesign">
              {imageList.length > 0 ? (
                <img
                  onClick={showModal}
                  src={imageList[imageList.length - 1].imageBase64}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="Captured"
                />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: 40, color: "#fff" }}
                  />
                </>
              )}

              <button
                disabled={disabledApp}
                className="btn-capture"
                onClick={captureImage}
              />
              <SyncOutlined
                className="btn-switch-camera"
                disabled={disabledApp}
                onClick={switchCamera}
                style={{ fontSize: "40px", color: "#fff", cursor: "unset" }}
              />
            </div>
          </div>
        </div>
      )}
      <Modal
        className="ModalViewImageSelect"
        open={isModalImageVisible}
        closable={false}
        footer={null}
      >
        <div className="HeaderModalSelect">
          <button className="buttonCloseModalView" onClick={handleCancel}>
            <img alt="iconCLose" className="iconCloseSelect" src={iconClose} />
          </button>
          {countCheckedImages() > 0 ? (
            <span className="spanTitleHeader">
              Đã chọn {countCheckedImages()} ảnh
            </span>
          ) : (
            <span className="spanTitleHeader">Ảnh đã chụp</span>
          )}
          {isChoose ? (
            <span onClick={clickChooseImageDelete} className="buttonChoose">
              Hủy
            </span>
          ) : (
            <span onClick={clickChooseImageDelete} className="buttonChoose">
              Chọn
            </span>
          )}
        </div>
        <div className="imageGallery">
          {imageList.map((image) => (
            <div key={image.imageName} className="image-item">
              <img
                onClick={() => onClickCheckImage(image.imageName)}
                className="imageSourceGalley"
                src={image.imageBase64}
                alt={image.imageName}
              />
              {isChoose ? (
                <input
                  className="inputChooseSelect"
                  onClick={() => onClickCheckImage(image.imageName)}
                  checked={image.imageCheck}
                  alt={image.imageName}
                  type="radio"
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="FooterDeleteImage">
          {isPrioritize ? (
            <button className="buttonDeleteImage">
              <span className="textButtonDelete">
                Tệp ảnh này đã được ưu tiên
              </span>
            </button>
          ) : countCheckedImages() > 0 ? (
            <>
              <button
                onClick={handleDeleteImages}
                className="buttonDeleteImage"
              >
                <span className="textButtonDelete">
                  Xóa {countCheckedImages()} ảnh
                </span>
              </button>
              <Modal
                className="ModalDeleteImageSelect"
                open={isModalDeleteImage}
                closable={false}
                footer={null}
              >
                <div className="TitleDeleteImage">
                  <span>Bạn có chắc chắn muốn xóa ảnh này không ?</span>
                </div>
                <div className="ButtonDeleteModal">
                  <button
                    className="ButtonDeleteAll"
                    onClick={handleDeleteImagesOk}
                  >
                    Có
                  </button>
                  <button
                    className="ButtonDeleteAll"
                    onClick={handleDeleteCancel}
                  >
                    Không
                  </button>
                </div>
              </Modal>
            </>
          ) : null}
        </div>
        <div className="footerModal">
          <div className="divUploadBtn">
            <button className="uploadButton" onClick={openModalUpload}>
              <img src={isUpdating ? iconUploadActive : iconUpload} />
            </button>
            <Modal
              className="ModelUploadImage"
              open={showModalUpload}
              closable={false}
              footer={null}
            >
              <div className="TitleUpdateModal">
                <span>Bạn có chắc chắn muốn upload bộ ảnh này không ?</span>
              </div>
              <div className="ButtonUpdateModal">
                <button
                  className="ButtonUpdateAll"
                  onClick={showModalCheckImage}
                >
                  Có
                </button>
                <button className="ButtonUpdateAll" onClick={closeModalUpload}>
                  Không
                </button>
              </div>
            </Modal>
          </div>
          <div className="divCheckPrioritize">
            <button onClick={buttonPrioritize} className="checkBoxButton">
              <img src={isPrioritize ? iconImportantActive : iconImportant} />
            </button>
            <span>Ưu tiên</span>
          </div>
        </div>
      </Modal>
      {isModalQuestion ? (
        <ModalCheckImage
          showModalQuestion={isModalQuestion}
          messageBox={
            imageList.length > 3
              ? "Tệp ảnh này đang có số lượng ảnh hơn 3 ảnh?"
              : imageList.length < 3
              ? "Tệp ảnh này đang có số lượng ảnh ít 3 ảnh?"
              : null
          }
          multiUploadImages={multiUploadImage}
          closeModalUpload={closeModalQuestion}
        />
      ) : null}
    </>
  );
};

export default MobileWebCam2;
