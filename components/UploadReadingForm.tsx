import React, { useState, useEffect, useContext } from "react";
import "../styles/ReactSlider.css";
import { UserContext } from "../lib/context";
import Cleave from "cleave.js/react";
import "../styles/UploadReadingForm.css";
import Step1 from "./UploadReadingForm/Step1";
import Step2 from "./UploadReadingForm/Step2";
import Step3 from "./UploadReadingForm/Step3";
import UploadSuccess from "./UploadReadingForm/UploadSuccess";
import Link from "next/link";
import { uploadReading } from "../lib/reading";
import Loader from "./UploadReadingForm/Loader";
import { useRouter } from "next/router";
import StepComponent from "./StepComponent";
const UploadReadingForm = () => {
  // retrieving the user properties
  const [loading, setLoading] = useState(false);
  const { user, userData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    dialect: false,
    selectedDialect: "",
    ageGroup: { min: 0, max: 100 },
    thumbnailFile: null,
    videoFiles: [{ file: null, subtitle: "", alertMessage: "", fileName: "" }],
  });
  const [message, setMessage] = useState("");
  const [isValid, setValid] = useState(false);
  const nextStep = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      setStep(step + 1);
      setMessage("");
    } else {
      setMessage(
        "Niet alle velden zijn correct ingevuld. Controleer deze even..."
      );
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubtitleChange = (e: any, index: any) => {
    const newVideoFiles = [...formData.videoFiles];
    const subtitle = e.target.value;
    const delimiter = " - ";
    let formattedSubtitle = subtitle;

    // Check if the subtitle ends with the delimiter
    if (subtitle.endsWith(delimiter)) {
      // Remove the delimiter from the end of the subtitle
      formattedSubtitle = subtitle.slice(0, -delimiter.length);
    }

    newVideoFiles[index].subtitle = formattedSubtitle;
    setFormData({
      ...formData,
      videoFiles: newVideoFiles,
    });
  };
  const prevStep = () => {
    setStep(step - 1);
    setMessage("");
  };

  const renderStep4 = () => (
    <div className="steps-container step4">
      <h3>Stap 4: Videobestand(en)</h3>
      {formData.videoFiles.map((video, index) => (
        <div key={index} className="videoFile-container">
          <div>
            <label> Video {index + 1}:</label>
          </div>
          <Cleave
            placeholder="vb. Hoofdstuk 1: titel"
            options={{
              prefix: `Hoofdstuk ${index + 1}`,
              blocks: [10 + (index + 1).toString().length, 50],
              delimiter: " - ",
            }}
            value={video.subtitle}
            onChange={(e) => handleSubtitleChange(e, index)}
            className="step5-input"
          />
          <div className="step-content">
            <label className="file-input__label">
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
              <span>Upload videobestand</span>
              <input
                type="file"
                onChange={(e) => handleVideoFileChange(e, index)}
                id="file-input"
                className="file-input__input"
              />
            </label>
            <div>
              <p className="file-name">
                Bestandsnaam: <span> {video.fileName}</span>
              </p>
              <img
                src="../images/Icon-delete.svg"
                onClick={() => removeVideoFile(index)}
                className="delete-btn"
              />
            </div>
          </div>

          {video.alertMessage && (
            <div className="text-red-500 text-lg mb-4">
              {video.alertMessage}
            </div>
          )}
          {video.file && !video.alertMessage && (
            <div className="text-green-500 text-lg mb-4">
              Correct videobestand
            </div>
          )}
        </div>
      ))}
      <button onClick={addVideoFile} className="addVideoFile-btn">
        Voeg extra video toe +
      </button>
    </div>
  );

  const addVideoFile = () => {
    setFormData({
      ...formData,
      videoFiles: [
        ...formData.videoFiles,
        { file: null, subtitle: "", alertMessage: "" },
      ],
    });
  };

  const removeVideoFile = (index: number) => {
    const newVideoFiles = [...formData.videoFiles];
    newVideoFiles.splice(index, 1);
    setFormData({
      ...formData,
      videoFiles: newVideoFiles,
    });
  };

  const handleVideoFileChange = (e: any, index: number) => {
    const file = e.target.files[0];
    const allowedTypes = ["video/mp4", "video/mpeg", "video/quicktime"]; // Add more video MIME types if needed
    const maxSize = 500 * 1024 * 1024; // 2GB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        const newVideoFiles = [...formData.videoFiles];
        newVideoFiles[index].alertMessage =
          "Incorrect videobestand. Selecteer een bestand van type mp4, mpeg of quicktime.";
        setFormData({
          ...formData,
          videoFiles: newVideoFiles,
        });
      } else if (file.size > maxSize) {
        const newVideoFiles = [...formData.videoFiles];
        newVideoFiles[
          index
        ].alertMessage = `Het videobestand is te groot. Selecteer een bestand met een maximale grootte van 500 MB.`;
        setFormData({
          ...formData,
          videoFiles: newVideoFiles,
        });
      } else {
        const newVideoFiles = [...formData.videoFiles];
        newVideoFiles[index].file = file;
        newVideoFiles[index].alertMessage = ""; // Clear the alert message for the specific video file
        newVideoFiles[index].fileName = file.name;
        setFormData({
          ...formData,
          videoFiles: newVideoFiles,
        });
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const { title, description, genre } = formData;

    const isTitleValid = title.trim() !== "";
    const isDescriptionValid = description.trim() !== "";
    const isGenreValid = genre !== "";

    const isFormValid = isTitleValid && isDescriptionValid && isGenreValid;
    setValid(isFormValid);

    return isFormValid;
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="multi-step">
              <StepComponent currentStep={1} totalSteps={5} />
              <div className="line"></div>
            </div>
            <Step1
              formData={formData}
              setFormData={setFormData}
              isValid={isValid}
              setValid={setValid}
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="multi-step">
              <StepComponent currentStep={2} totalSteps={5} />
              <div className="line" style={{ width: "50%" }}></div>
            </div>
            <Step2
              formData={formData}
              setFormData={setFormData}
              isValid={isValid}
              setValid={setValid}
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="multi-step">
              <StepComponent currentStep={3} totalSteps={5} />
              <div className="line" style={{ width: "75%" }}></div>
            </div>
            <Step3 formData={formData} setFormData={setFormData} />
          </>
        );
      case 4:
        return (
          <>
            <div className="multi-step">
              <StepComponent currentStep={4} totalSteps={5} />
              <div className="line" style={{ width: "75%" }}></div>
            </div>
            {renderStep4()}
          </>
        );
      case 5:
        return (
          <>
            <div className="multi-step">
              <StepComponent currentStep={5} totalSteps={5} />
              <div className="line" style={{ width: "100%" }}></div>
            </div>
            <UploadSuccess />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isFormValid = validateForm();

    if (isFormValid && user && user.uid) {
      const { videoFiles } = formData;

      // Check if there are any video files present
      if (videoFiles.length === 0 || videoFiles.some((video) => !video.file)) {
        setMessage("Geen videobestanden of ongeldige bestanden aanwezig.");
        setLoading(false);
        return;
      }

      const readingData = {
        ...formData,
        uid: user.uid,
      };
      try {
        setMessage("");
        await uploadReading(readingData); // Call the uploadReading function with formData

        setLoading(false);
        nextStep();
      } catch (error) {
        console.error("Error uploading reading:", error);
      }
    } else {
      console.log("Niet alle velden zijn correct ingevuld");
    }
  };

  if (!user || !user.uid) {
    // If user or user.uid does not exist, do not render the form
    return (
      <>
        <div>
          Het is niet mogelijk om een voorlezing aan te maken als je niet
          aangemeld bent.
        </div>
        <Link href={"/signin"}>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4">
            Aanmelden
          </button>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <div>
          <div>
            {renderForm()}
            <div className="btn-steps-container">
              {step == 1 && (
                <>
                  <button
                    type="button"
                    className="button cancel-btn"
                    onClick={() => router.back()}
                  >
                    Annuleer
                  </button>
                  <button className="button next-btn" onClick={nextStep}>
                    Volgende
                  </button>
                </>
              )}
              {step == 2 && (
                <>
                  <button onClick={prevStep} className="button cancel-btn">
                    Vorige
                  </button>
                  <button onClick={nextStep} className="button next-btn">
                    Volgende
                  </button>
                </>
              )}
              {step == 3 && (
                <>
                  <button onClick={prevStep} className="button cancel-btn">
                    Vorige
                  </button>
                  {formData.thumbnailFile ? (
                    <button onClick={nextStep} className="button next-btn">
                      Volgende
                    </button>
                  ) : (
                    <button
                      disabled
                      onClick={nextStep}
                      className="button next-btn"
                    >
                      Volgende
                    </button>
                  )}
                </>
              )}

              {step == 4 && (
                <>
                  <button onClick={prevStep} className="button cancel-btn">
                    Vorige
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Bevestig
                  </button>
                </>
              )}

              {step == 5 && (
                <>
                  <button
                    className="button cancel-btn step5-btn"
                    onClick={() => window.location.reload()}
                  >
                    + Nog één?
                  </button>
                  <button className="button next-btn step5-btn" id="test">
                    <a href="/">Startscherm</a>
                  </button>
                </>
              )}
            </div>
          </div>
          <h4
            className={`uploadReading-alertErr ${
              message !== "" ? "uploadReading-show" : ""
            }`}
          >
            {message}
          </h4>
          <h4>
            {loading ? (
              <Loader text="Even geduld, je voorlezing wordt aangemaakt." />
            ) : (
              ""
            )}
          </h4>
        </div>
      </>
    );
  }
};

export default UploadReadingForm;
