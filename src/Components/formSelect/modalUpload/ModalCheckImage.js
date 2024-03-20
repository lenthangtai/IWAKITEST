import { Modal } from 'antd'
import React, { useState } from 'react'

export default function ModalCheckImage({showModalQuestion,messageBox,multiUploadImages,closeModalUpload}) {
  return (
    <Modal
    className="ModelUploadImage"
    open={showModalQuestion}
    closable={false}
    footer={null}
  >
    <div className="TitleUpdateModal">
      <span>{messageBox}</span>
    </div>
    <div className="ButtonUpdateModal">
      <button
        className="ButtonUpdateAll"
        onClick={multiUploadImages}
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
  </Modal>  )
}
