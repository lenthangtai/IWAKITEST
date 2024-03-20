import React, { useEffect, useState } from "react";
import "./formSelect2.css";

import logoIwaki from "../../Images/LogoIwaki.svg";
import BackgroundIconVector from "../../Images/BackgroundIconVector.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal, Row, Select, Upload, message, notification } from "antd";

import { localhost } from "../../server";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import iconUpload from "../../Images/uploadPhotosLinear.svg";
import iconUploadActive from "../../Images/uploadPhotosLinearHover.svg";
import iconImportant from "../../Images/prioritizeLinear.svg";
import iconImportantActive from "../../Images/prioritizeBoad.svg";
import iconClose from "../../Images/iconClose.svg";
import iconSuccess from "../../Images/iconComplete.svg";
import iconArrowDropDown from "../../Images/arrowDropDown.svg";
import iconLoading from "../../Images/iconLoading.svg";
import ModalCheckImage from "./modalUpload/ModalCheckImage";
import "./modalUpload/ModelSelect.css";
import ModalDelete from "./modalUpload/ModalDelete";

const MySwal = withReactContent(Swal);
const { Option } = Select;
export default function FormSelect2() {
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalDeleteImage, setIsModalDeleteImage] = useState(false);
  const [isPrioritize, setIsPrioritize] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState(["LK"]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isChoose, setIsChoose] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const [checkedTime, setCheckedTime] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const userInfo = useSelector((state) => state.user);

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

  useEffect(() => {
    if (imageList.length === 0) {
      setIsModalImageVisible(false);
    }
  }, [imageList]);

  const showModal = () => {
    setIsModalImageVisible(true);
  };
  const handleOk = () => {
    setIsModalImageVisible(false);
  };

  const handleCancel = () => {
    setImageList([]);
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

  // const handleDeleteImages = () => {
  //   MySwal.fire({
  //     title: (
  //       <span
  //         style={{
  //           fontFamily: "Lato",
  //           fontSize: "14px",
  //           fontWeight: "400",
  //           lineHeight: "20px",
  //           letterSpacing: "0.20000000298023224px",
  //           textAlign: "center",
  //         }}
  //       >
  //         Bạn có chắc chắn muốn xóa ảnh này không?
  //       </span>
  //     ),
  //     showCancelButton: true,
  //     confirmButtonText: "Có",
  //     cancelButtonText: "Không",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const updatedImages = images.filter((image) => !image.imageCheck);
  //       setImages(updatedImages);
  //     }
  //     //else if (result.dismiss === MySwal.DismissReason.cancel) {

  //     // }
  //   });
  // };
  const handleDeleteImages = () => {
    showModalDelete();
  };
  const buttonPrioritize = () => {
    setIsPrioritize(!isPrioritize);
    // setIsPrioritize(true);
    showPrioritize(!isPrioritize);
  };

  const showPrioritize = async (Prioritized) => {
    console.log(isPrioritize);
    notification.destroy();
    if (Prioritized === true) {
      // notification.destroy();
      notification.info({
        // message: "",
        description: "Tệp ảnh này đang được ưu tiên",
        placement: "topRight",
      });
    } else {
      notification.info({
        // message: "",
        description: "Tệp ảnh này đang không được ưu tiên",
        placement: "topRight",
      });
    }
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
  const [items, setItems] = useState(["LK", "LC"]);
  const [items2, setItems2] = useState(sessionStorage.getItem("OptionMaChine"));
  const [canChangePage, setCanChangePage] = useState(false);

  const handleChangeSelectOptions = (value) => {
    console.log(sessionStorage.getItem("OptionMaChine"));
    console.log(`selected ${value}`);
    sessionStorage.setItem("OptionMaChine", value);
    setItems2(value);
  };
  const uploadProps = {
    name: "file",
    showUploadList: false,
    capture: false,
    multiple: true,
    beforeUpload(file) {
      const optionMachine = sessionStorage.getItem("optionMachine");
      // if (optionMachine !== null){

      // }

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
          imageCheck: false,
        };
        setImageList((prevImageList) => [...prevImageList, imageInfo]);
      };
      reader.readAsDataURL(newFile);
    },
  };
  const customRequest = () => {
    setTimeout(() => {
      setIsModalImageVisible(true);
    }, 1000);
  };

  const [isModalQuestion, setIsModalQuestion] = useState(false);
  const closeModalQuestion = () => {
    setIsModalQuestion(false);
  };
  const showModalCheckImage = () => {
    if (imageList.length > 3) {
      setShowModalUpload(false);
      setIsModalQuestion(true);
    }
    else if (imageList.length < 3) {
      setShowModalUpload(false);
      setIsModalQuestion(true);
    }
    else{
      multiUploadImage();
    }
  };

  const multiUploadImage = async () => {
    setIsModalQuestion(false);
    setShowModalUpload(false);
    try {
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

  // useEffect(() => {
  //   setItems2(sessionStorage.getItem("OptionMaChine"))
  // }, [sessionStorage.getItem("OptionMaChine")])

  const checkMachineBeforeChangeCamera = async () => {
    const callMachine = sessionStorage.getItem("OptionMaChine");
    console.log(callMachine);
    if (callMachine === null || callMachine === undefined) {
      notification.destroy();
      notification.error({
        message: "CHƯA CHỌN OPTION MÁY",
        description: "Vui lòng chọn option của máy trước khi qua trang",
        placement: "topRight",
      });
      setCanChangePage(false);
    } else {
      setCanChangePage(true);
      window.location.href = "/CaptureCamera";
    }
  };
  return (
    <div className="FormSelect">
      <div className="logoIwakiSelect">
        <img src={logoIwaki} />
      </div>
      <div className="button-select">
        <Select
          value={items2}
          onChange={handleChangeSelectOptions}
          suffixIcon={
            <span className="spanSuffixIconDropdown">
              <img className="iconDropDownSelect" src={iconArrowDropDown} />
            </span>
          }
          className="optionMachineSelect"
          placeholder="Mode mã máy: "
        >
          {items.map((item, index) => (
            <Option className="optionKeyItem" key={item} value={item}>
              <span className="spanOptionKeyItem">{item}</span>
            </Option>
          ))}
        </Select>
        <button
          onClick={checkMachineBeforeChangeCamera}
          className="buttonSelect btnSelectCapture"
        >
          <p className="textCapture">Capture</p>
        </button>
        <Upload
          className="btnUploadSelect"
          {...uploadProps}
          fileList={[]}
          listType="picture"
          accept=".png,.jpg,.jpeg,.tif"
          customRequest={customRequest}
          // capture="false"
        >
          <button type="button" className="buttonSelect btnSelectUpload">
            <p className="textUpload">Upload File</p>
          </button>
        </Upload>
        <Modal
          className="ModalViewImageSelect"
          open={isModalImageVisible}
          closable={false}
          footer={null}
        >
          <div className="HeaderModalSelect">
            <button className="buttonCloseModalView" onClick={handleCancel}>
              <img
                alt="iconCLose"
                className="iconCloseSelect"
                src={iconClose}
              />
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
                      onClick={() =>
                        handleDeleteImagesOk(imageList, setImageList)
                      }
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
                  <button
                    className="ButtonUpdateAll"
                    onClick={closeModalUpload}
                  >
                    Không
                  </button>
                </div>
              </Modal>
              {/* <span>Upload Toàn bộ</span> */}
            </div>
            <div className="divCheckPrioritize">
              <button onClick={buttonPrioritize} className="checkBoxButton">
                <img src={isPrioritize ? iconImportantActive : iconImportant} />
              </button>
              <span>Ưu tiên</span>
            </div>
          </div>
        </Modal>
        <button className="buttonSelect btnSelectManager">
          <p className="textFileManager">File Manager</p>
        </button>
      </div>
      <div className="imageNenVectorFormSelect">
        <img src={BackgroundIconVector} />
      </div>
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
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import "./formSelect2.css";

// import logoIwaki from "../../Images/LogoIwaki.svg";
// import BackgroundIconVector from "../../Images/BackgroundIconVector.svg";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Modal, Row, Select, Upload, message, notification } from "antd";

// import { localhost } from "../../server";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";

// import iconUpload from "../../Images/uploadPhotosLinear.svg";
// import iconUploadActive from "../../Images/uploadPhotosLinearHover.svg";
// import iconImportant from "../../Images/prioritizeLinear.svg";
// import iconImportantActive from "../../Images/prioritizeBoad.svg";
// import iconClose from "../../Images/iconClose.svg";
// import iconSuccess from "../../Images/iconComplete.svg";
// import iconArrowDropDown from "../../Images/arrowDropDown.svg";
// import iconLoading from "../../Images/iconLoading.svg";
// import ModalCheckImage from "./modalUpload/ModalCheckImage";
// import "./modalUpload/ModelSelect.css";
// import ModalDelete from "./modalUpload/ModalDelete";

// const MySwal = withReactContent(Swal);
// const { Option } = Select;
// export default function FormSelect2() {
//   const [isModalImageVisible, setIsModalImageVisible] = useState(false);
//   const [isModalDeleteImage, setIsModalDeleteImage] = useState(false);
//   const [isPrioritize, setIsPrioritize] = useState(false);
//   const [imageList, setImageList] = useState([]);
//   const [checked, setChecked] = useState(false);
//   const [options, setOptions] = useState(["LK"]);
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [isChoose, setIsChoose] = useState(false);
//   const [showModalUpload, setShowModalUpload] = useState(false);

//   const [checkedTime, setCheckedTime] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(null);
//   const userInfo = useSelector((state) => state.user);
//   useEffect(() => {
//     if (checkedTime === true) {
//       setCheckedTime(null);
//       MySwal.fire({
//         iconHtml: <img src={iconSuccess} />,
//         title: "Hoàn thành !!",
//         customClass: "custome-success",
//         showConfirmButton: false,
//         timer: 2500,
//         customClass: {
//           popup: "custome-form-success",
//           icon: "custome-class-success",
//           title: "custome-title-success",
//         },
//       });
//       setImageList([]);
//       setIsModalImageVisible(false);
//       setIsUpdating(false);
//       setIsPrioritize(false);
//     } else if (checkedTime === false) {
//       setCheckedTime(null);
//       MySwal.fire({
//         iconHtml: <img src={iconLoading} />,
//         title: "Đang upload toàn bộ ảnh",
//         showConfirmButton: false,
//         timer: 2000000,
//         allowOutsideClick: false,
//         customClass: {
//           popup: "custome-form-loading",
//           icon: "custome-class-loading",
//           title: "custome-title-loading",
//         },
//       });
//       setIsUpdating(true);
//     }
//   }, [checkedTime]);

//   useEffect(() => {
//     if (imageList.length === 0) {
//       setIsModalImageVisible(false);
//     }
//   }, [imageList]);

//   const showModal = () => {
//     setIsModalImageVisible(true);
//   };
//   const handleOk = () => {
//     setIsModalImageVisible(false);
//   };

//   const handleCancel = () => {
//     setImageList([]);
//     setIsModalImageVisible(false);
//     setIsPrioritize(false);
//     setIsChoose(false);
//     onClickCancelCheckImage();
//   };

//   const showModalDelete = () => {
//     setIsModalDeleteImage(true);
//   };
//   const handleDeleteOK = () => {
//     setIsModalDeleteImage(false);
//   };

//   const handleDeleteCancel = () => {
//     setIsModalDeleteImage(false);
//   };
//   const onClickCheckImage = (imageName) => {
//     if (isChoose) {
//       const updatedImages = imageList.map((image) =>
//         image.imageName === imageName
//           ? { ...image, imageCheck: !image.imageCheck }
//           : { ...image }
//       );
//       setImageList(updatedImages);
//     }
//   };

//   const onClickCancelCheckImage = () => {
//     const updatedImages = imageList.map((image) =>
//       image.imageCheck === true ? { ...image, imageCheck: false } : { ...image }
//     );
//     setImageList(updatedImages);
//   };
//   const onClickChooseAllImage = () => {
//     console.log(imageList);
//     const updatedImages = imageList.map((image) =>
//       image.imageCheck === false ? { ...image, imageCheck: true } : { ...image }
//     );
//     setImageList(updatedImages);
//   };

//   const countCheckedImages = () => {
//     return imageList.filter((image) => image.imageCheck).length;
//   };

//   const handleDeleteImagesOk = () => {
//     const updatedImages = imageList.filter((image) => !image.imageCheck);
//     setImageList(updatedImages);
//     setIsModalDeleteImage(false);
//     if (imageList.length === 0) {
//       setIsModalImageVisible(false);
//     }
//   };

//   // const handleDeleteImages = () => {
//   //   MySwal.fire({
//   //     title: (
//   //       <span
//   //         style={{
//   //           fontFamily: "Lato",
//   //           fontSize: "14px",
//   //           fontWeight: "400",
//   //           lineHeight: "20px",
//   //           letterSpacing: "0.20000000298023224px",
//   //           textAlign: "center",
//   //         }}
//   //       >
//   //         Bạn có chắc chắn muốn xóa ảnh này không?
//   //       </span>
//   //     ),
//   //     showCancelButton: true,
//   //     confirmButtonText: "Có",
//   //     cancelButtonText: "Không",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       const updatedImages = images.filter((image) => !image.imageCheck);
//   //       setImages(updatedImages);
//   //     }
//   //     //else if (result.dismiss === MySwal.DismissReason.cancel) {

//   //     // }
//   //   });
//   // };
//   const handleDeleteImages = () => {
//     showModalDelete();
//   };
//   const buttonPrioritize = () => {
//     setIsPrioritize(!isPrioritize);
//     // setIsPrioritize(true);
//     showPrioritize(!isPrioritize);
//   };

//   const showPrioritize = async (Prioritized) => {
//     console.log(isPrioritize);
//     notification.destroy();
//     if (Prioritized === true) {
//       // notification.destroy();
//       notification.info({
//         // message: "",
//         description: "Tệp ảnh này đang được ưu tiên",
//         placement: "topRight",
//       });
//     } else {
//       notification.info({
//         // message: "",
//         description: "Tệp ảnh này đang không được ưu tiên",
//         placement: "topRight",
//       });
//     }
//   };

//   const onChangeCheckBox = (e) => {
//     console.log("checked = ", e.target.checked);
//     setChecked(e.target.checked);
//   };
//   const handleSelectChange = (value) => {
//     setSelectedValue(value);
//   };

//   const handleDeleteImage = (imageName) => {
//     // Filter out the image with the given imageName
//     const updatedImageList = imageList.filter(
//       (image) => image.imageName !== imageName
//     );
//     setImageList(updatedImageList);
//   };
//   const [items, setItems] = useState(["LK", "LC"]);
//   const [items2, setItems2] = useState(sessionStorage.getItem("OptionMaChine"));
//   const [canChangePage, setCanChangePage] = useState(false);

//   const handleChangeSelectOptions = (value) => {
//     console.log(sessionStorage.getItem("OptionMaChine"));
//     console.log(`selected ${value}`);
//     sessionStorage.setItem("OptionMaChine", value);
//     setItems2(value);
//   };
//   const uploadProps = {
//     name: "file",
//     showUploadList: false,
//     capture: false,
//     multiple: true,
//     beforeUpload(file) {
//       const optionMachine = sessionStorage.getItem("optionMachine");
//       // if (optionMachine !== null){

//       // }

//       const isPNG = file.type === "image/png";
//       const isJPG = file.type === "image/jpg";
//       const isJPEG = file.type === "image/jpeg";
//       const isTIF = file.type === "image/tif";

//       if (!isPNG && !isJPG && !isJPEG && !isTIF) {
//         message.error(`${file.name} is not a Image file`);
//       } else {
//         return isPNG || isJPEG || isJPG || isTIF;
//       }
//     },
//     onChange(info) {
//       const newFile = info.file.originFileObj;
//       console.log(newFile);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const imageBase64 = e.target.result;
//         const imageInfo = {
//           imageName: newFile.name,
//           imageType: newFile.type,
//           imageBase64: imageBase64,
//           imageCheck: false,
//         };
//         setImageList((prevImageList) => [...prevImageList, imageInfo]);
//       };
//       reader.readAsDataURL(newFile);
//     },
//   };
//   const customRequest = () => {
//     setTimeout(() => {
//       setIsModalImageVisible(true);
//     }, 1000);
//   };

//   const [isModalQuestion, setIsModalQuestion] = useState(false);
//   const closeModalQuestion = () => {
//     setIsModalQuestion(false);
//   };
//   const showModalCheckImage = () => {
//     if (imageList.length > 3) {
//       setShowModalUpload(false);
//       setIsModalQuestion(true);
//     }
//     if (imageList.length < 3) {
//       setShowModalUpload(false);
//       setIsModalQuestion(true);
//     }
//   };

//   const multiUploadImage = async () => {
//     setShowModalUpload(false);
//     try {
//       // const optionMachine = sessionStorage.getItem("optionMachine");
//       // if (optionMachine !== null) {
//       // console.log(optionMachine);
//       if (items2 !== null) {
//         setCheckedTime(false);

//         const prioriti = checked ? "1" : "0";
//         const FormData = require("form-data");
//         let data = new FormData();
//         data.append("prioriti", prioriti);
//         data.append("id_user", userInfo.user_id);
//         data.append("type_upload", "2");
//         data.append("pumb_model", items2);
//         imageList.map((image) => {
//           const nameFile = image.imageName;
//           const typeFile = image.imageType;
//           const getFileBase64 = image.imageBase64;

//           const byteCharacters = atob(getFileBase64.split(",")[1]);

//           const byteNumbers = new Array(byteCharacters.length);
//           for (let i = 0; i < byteCharacters.length; i++) {
//             byteNumbers[i] = byteCharacters.charCodeAt(i);
//           }
//           const byteArray = new Uint8Array(byteNumbers);

//           const buffer = byteArray.buffer;

//           const blob = new Blob([buffer], { type: typeFile });

//           const getFile = new File([blob], nameFile, { type: typeFile });
//           console.log(getFile);
//           data.append("file_upload", getFile);
//         });
//         axios
//           .post(`${localhost}upload_file`, data)
//           .then((response) => {
//             setCheckedTime(true);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         console.log("null");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const clickChooseImageDelete = () => {
//     setIsChoose(!isChoose);
//     if (isChoose) {
//       setIsChoose(false);
//       onClickCancelCheckImage();
//     } else {
//       setIsChoose(true);
//     }
//   };

//   const openModalUpload = () => {
//     setShowModalUpload(true);
//   };
//   const closeModalUpload = () => {
//     setShowModalUpload(false);
//   };

//   // useEffect(() => {
//   //   setItems2(sessionStorage.getItem("OptionMaChine"))
//   // }, [sessionStorage.getItem("OptionMaChine")])

//   const checkMachineBeforeChangeCamera = async () => {
//     const callMachine = sessionStorage.getItem("OptionMaChine");
//     console.log(callMachine);
//     if (callMachine === null || callMachine === undefined) {
//       notification.destroy();
//       notification.error({
//         message: "CHƯA CHỌN OPTION MÁY",
//         description: "Vui lòng chọn option của máy trước khi qua trang",
//         placement: "topRight",
//       });
//       setCanChangePage(false);
//     } else {
//       setCanChangePage(true);
//       window.location.href = "/CaptureCamera";
//     }
//   };
//   return (
//     <div className="FormSelect">
//       <div className="logoIwaki">
//         <img src={logoIwaki} />
//       </div>
//       <div className="button-select">
//         <div className="selectOptionMachineButton">
//           <Select
//             value={items2}
//             onChange={handleChangeSelectOptions}
//             suffixIcon={
//               <span className="spanSuffixIconDropdown">
//                 <img className="iconDropDownSelect" src={iconArrowDropDown} />
//               </span>
//             }
//             className="optionMachineSelect"
//             placeholder="Mode mã máy: "
//           >
//             {items.map((item, index) => (
//               <Option className="optionKeyItem" key={item} value={item}>
//                 <span className="spanOptionKeyItem">{item}</span>
//               </Option>
//             ))}
//           </Select>
//         </div>
//         <div className="captureCameraButton">
//           <button
//             onClick={checkMachineBeforeChangeCamera}
//             className="buttonSelect btnSelectCapture"
//           >
//             <p className="textCapture">Capture</p>
//           </button>
//         </div>
//         <div className="uploadFileButton">
//           <Upload
//             className="btnUploadSelect"
//             {...uploadProps}
//             fileList={[]}
//             listType="picture"
//             accept=".png,.jpg,.jpeg,.tif"
//             customRequest={customRequest}
//             // capture="false"
//           >
//             <button type="button" className="buttonSelect btnSelectUpload">
//               <p className="textUpload">Upload File</p>
//             </button>
//           </Upload>
//         </div>
//         <Modal
//           className="ModalViewImageSelect"
//           open={isModalImageVisible}
//           closable={false}
//           footer={null}
//         >
//           <div className="HeaderModalSelect">
//             <button className="buttonCloseModalView" onClick={handleCancel}>
//               <img
//                 alt="iconCLose"
//                 className="iconCloseSelect"
//                 src={iconClose}
//               />
//             </button>
//             {countCheckedImages() > 0 ? (
//               <span className="spanTitleHeader">
//                 Đã chọn {countCheckedImages()} ảnh
//               </span>
//             ) : (
//               <span className="spanTitleHeader">Ảnh đã chụp</span>
//             )}
//             {isChoose ? (
//               <span onClick={clickChooseImageDelete} className="buttonChoose">
//                 Hủy
//               </span>
//             ) : (
//               <span onClick={clickChooseImageDelete} className="buttonChoose">
//                 Chọn
//               </span>
//             )}
//           </div>
//           <div className="imageGallery">
//             {imageList.map((image) => (
//               <div key={image.imageName} className="image-item">
//                 <img
//                   onClick={() => onClickCheckImage(image.imageName)}
//                   className="imageSourceGalley"
//                   src={image.imageBase64}
//                   alt={image.imageName}
//                 />
//                 {isChoose ? (
//                   <input
//                     className="inputChooseSelect"
//                     onClick={() => onClickCheckImage(image.imageName)}
//                     checked={image.imageCheck}
//                     alt={image.imageName}
//                     type="radio"
//                   />
//                 ) : null}
//               </div>
//             ))}
//           </div>
//           <div className="FooterDeleteImage">
//             {isPrioritize ? (
//               <button className="buttonDeleteImage">
//                 <span className="textButtonDelete">
//                   Tệp ảnh này đã được ưu tiên
//                 </span>
//               </button>
//             ) : countCheckedImages() > 0 ? (
//               <>
//                 <button
//                   onClick={handleDeleteImages}
//                   className="buttonDeleteImage"
//                 >
//                   <span className="textButtonDelete">
//                     Xóa {countCheckedImages()} ảnh
//                   </span>
//                 </button>
//                 {isModalDeleteImage ? (
//                   <ModalDelete
//                     isModalDeleteImage={isModalDeleteImage}
//                     handleDeleteImagesOk={handleDeleteImagesOk}
//                     handleDeleteCancel={handleDeleteCancel}
//                   />
//                 ) : null}
//               </>
//             ) : null}
//           </div>
//           <div className="footerModal">
//             <div className="divUploadBtn">
//               <button className="uploadButton" onClick={openModalUpload}>
//                 <img src={isUpdating ? iconUploadActive : iconUpload} />
//               </button>
//               <Modal
//                 className="ModelUploadImage"
//                 open={showModalUpload}
//                 closable={false}
//                 footer={null}
//               >
//                 <div className="TitleUpdateModal">
//                   <span>Bạn có chắc chắn muốn upload bộ ảnh này không ?</span>
//                 </div>
//                 <div className="ButtonUpdateModal">
//                   <button
//                     className="ButtonUpdateAll"
//                     onClick={showModalCheckImage}
//                   >
//                     Có
//                   </button>
//                   <button
//                     className="ButtonUpdateAll"
//                     onClick={closeModalUpload}
//                   >
//                     Không
//                   </button>
//                 </div>
//               </Modal>
//               {/* <span>Upload Toàn bộ</span> */}
//             </div>
//             <div className="divCheckPrioritize">
//               <button onClick={buttonPrioritize} className="checkBoxButton">
//                 <img src={isPrioritize ? iconImportantActive : iconImportant} />
//               </button>
//               <span>Ưu tiên</span>
//             </div>
//           </div>
//         </Modal>
//         <div className="fileManagerButton">
//           <button className="buttonSelect btnSelectManager">
//             <p className="textFileManager">File Manager</p>
//           </button>
//         </div>
//       </div>
//       <div className="imageNenVector">
//         <img src={BackgroundIconVector} />
//       </div>
//       {isModalQuestion ? (
//         <ModalCheckImage
//           showModalQuestion={isModalQuestion}
//           messageBox={
//             imageList.length > 3
//               ? "Tệp ảnh này đang có số lượng ảnh hơn 3 ảnh?"
//               : imageList.length < 3
//               ? "Tệp ảnh này đang có số lượng ảnh ít 3 ảnh?"
//               : null
//           }
//           multiUploadImages={multiUploadImage}
//           closeModalUpload={closeModalQuestion}
//         />
//       ) : null}
//     </div>
//   );
// }
