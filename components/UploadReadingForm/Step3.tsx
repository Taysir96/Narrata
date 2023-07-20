import React, { useState, useRef } from "react";

const Step3 = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { thumbnailFile } = formData;
  const [alertMessage, setAlertMessage] = useState("");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"]; // Add more image MIME types if needed
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    setFileName(file.name);

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setAlertMessage(
          "Incorrect bestandstype. Selecteer een afbeelding van type JPEG of PNG."
        );
        setFormData({ ...formData, thumbnailFile: null });
      } else if (file.size > maxSize) {
        setAlertMessage(
          "De afbeelding is te groot. Selecteer een afbeelding met een maximale grootte van 1MB."
        );
        setFormData({ ...formData, thumbnailFile: null });
      } else {
        setFormData({ ...formData, thumbnailFile: file });
        setAlertMessage("");
      }
    }
  };

  const removeVideoFile = () => {
    setFormData({ ...formData, thumbnailFile: null });
    setFileName("");
    setAlertMessage("");
  };

  return (
    <div className="steps-container step3">
      <h3>Stap 3: Thumbnail toevoegen</h3>
      <div className="step-content">
        {/* <label htmlFor="file-input">Thumbnail bestand:</label> */}
        <label className="file-input__label" htmlFor="file-input">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="upload"
            className="svg-inline--fa fa-upload fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fac215"
              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            ></path>
          </svg>
          <span>Upload file</span>
          <input
            type="file"
            onChange={(e) => handleThumbnailFileChange(e)}
            id="file-input"
            className="file-input__input"
          />
        </label>
        {/* {fileName && (
          <div>
            <p className="file-name">
              Bestandsnaam: <span> {fileName}</span>
            </p>
            <img
              src="../images/Icon-delete.svg"
              onClick={() => removeVideoFile()}
              className="delete-btn"
            />
          </div>
        )} */}
        {thumbnailFile && (
          <div>
            <p className="file-name">
              Bestandsnaam: <span> {fileName}</span>
            </p>
            <img
              src="../images/Icon-delete.svg"
              onClick={() => removeVideoFile()}
              className="delete-btn"
            />
          </div>
        )}
      </div>
      <div className="step-content">
        {alertMessage && (
          <div className="text-red-500 text-lg mb-4">{alertMessage}</div>
        )}
        {thumbnailFile && !alertMessage && (
          <div className="text-green-500 text-lg mb-4">
            Correct afbeeldingsbestand
          </div>
        )}
        {thumbnailFile && !alertMessage && (
          <div>
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="Thumbnail preview"
              className="thumbnail-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
