import { Modal } from "antd";
import React from "react";

export default function ModalDelete(imageList,setImageList,isModalDeleteImage,handleDeleteImagesOk,handleDeleteCancel) {
  return (
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
        <button className="ButtonDeleteAll" onClick={()=>handleDeleteImagesOk(imageList,setImageList)}>
          Có
        </button>
        <button className="ButtonDeleteAll" onClick={handleDeleteCancel}>
          Không
        </button>
      </div>
    </Modal>
  );
}
