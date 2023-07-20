import React, { useEffect, useState, useRef } from "react";
import { updateProfile } from "../../../lib/users";

const EditProfileModal = ({
  profileData,
  setShowEditModal,
  refreshProfileData,
}: {
  profileData: any;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProfileData: any;
}) => {
  const [username, setUsername] = useState(profileData.username);
  const [description, setDescription] = useState(profileData?.description);
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    profileData?.profilePictureUrl
  );
  // profile picture
  const [alertMessage, setAlertMessage] = useState("");
  const [profilePictureFile, setProfilPictureFile] = useState(null);

  useEffect(() => {
    setUsername(profileData.username);
    setDescription(profileData.description);
  }, [profileData]);
  const [showSuccessMessage, setShowSuccessMessage] =
    React.useState<boolean>(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleUpdateClick = async () => {
    if (username == "") {
      return setErrorMessage(
        "Je hebt geen gebruikersnaam ingegeven. Dit is steeds verplicht!"
      );
    }
    const updatedProfile = {
      ...profileData,
      username: username,
      description: description,
    };
    await updateProfile(profileData.object_id, updatedProfile);
    setErrorMessage("");
    refreshProfileData();
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowEditModal(false);
    }, 2000);
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"]; // Add more image MIME types if needed
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setAlertMessage(
          "Incorrect bestandstype. Selecteer een afbeelding van type JPEG of PNG."
        );
        setProfilPictureFile(null);
      } else if (file.size > maxSize) {
        setAlertMessage(
          "De afbeelding is te groot. Selecteer een afbeelding met een maximale grootte van 1MB."
        );
        setProfilPictureFile(null);
      } else {
        setProfilePictureUrl("");
        setProfilPictureFile(file);
        setAlertMessage("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 text-black">
        <h3 className="text-black">Profiel bewerken</h3>
        <div className="mt-7 text-black">
          <label className="block mb-2 font-medium text-black">
            Gebruikersnaam
          </label>
          <input
            value={username}
            placeholder="Jouw gebruikersnaam..."
            type="text"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-black">
            Over mezelf
          </label>
          <textarea
            value={description}
            placeholder="Een korte beschrijving over jezelf..."
            className="p-2 border border-gray-300 rounded-md mb-4 w-full text-black max-h-48"
            rows={4}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-medium text-black">
            Profiel foto
          </label>
          <input
            type="file"
            onChange={(e) => handleThumbnailFileChange(e)}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded"
          />
          {alertMessage && (
            <div className="text-red-500 text-sm mb-4">{alertMessage}</div>
          )}
          {profilePictureFile && !alertMessage && (
            <div className="text-green-500 text-sm mb-4">
              Correct afbeeldingsbestand
            </div>
          )}

          {profilePictureUrl && (
            <div className="w-24 h-24 bg-red-500 mt-2">
              <img
                src={profileData?.profilePictureUrl}
                alt="Thumbnail preview"
                className="object-cover w-full h-full rounder-full bg-red-500"
              />
            </div>
          )}
          {profilePictureFile && !alertMessage && (
            <div className="w-24 h-24 mt-2">
              <img
                src={URL.createObjectURL(profilePictureFile)}
                alt="Thumbnail preview"
                className="object-cover w-full h-full rounder-full"
              />
            </div>
          )}
        </div>

        {errorMessage && (
          <div>
            <p className=" items-center h-fit text-red-800 bg-red-300 p-4 w-full rounded-md">
              {errorMessage}
            </p>
          </div>
        )}
        {showSuccessMessage && (
          <div className=" bg-green-300 h-12  rounded-md flex items-center pl-4 pr-4">
            <p className="text-green-800">Profiel succesvol bewerkt!</p>
          </div>
        )}
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-200"
          >
            Annuleren
          </button>
          <button
            onClick={() => {
              handleUpdateClick();
            }}
            className="px-4 py-2 mr-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            Bevestig aanpassingen
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
