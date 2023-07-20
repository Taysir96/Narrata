import React, { useState, useRef } from "react";
import { uploadGenre } from "../../lib/genres";
const CreateGenre = ({ refreshTipsData }: { refreshTipsData: any }) => {
  const [alertMessage, setAlertMessage] = useState(false);
  const [title, setTitle] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] =
    React.useState<boolean>(false);

  // useRef inputs
  const inputRefTitle: any = useRef();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddClick = async () => {
    const newTip = {
      title: title,
    };

    await uploadGenre(newTip);
    refreshTipsData();
    inputRefTitle.current.value = "";

    setTitle("");
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div
      style={{
        boxShadow: "1px 2px 4px #132653",
        backgroundColor: "#163275",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Genre Toevoegen</h2>
      <div className="mt-7">
        <label className="block mb-2 font-medium">Naam</label>
        <input
          ref={inputRefTitle}
          placeholder="Geef hier de benaming van het genre in..."
          type="text"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex  gap-4 h-fit w-full ">
        {title ? (
          <button
            className="bg-yellow-500 mb-4 h-12"
            type="button"
            onClick={handleAddClick}
          >
            Toevoegen
          </button>
        ) : (
          ""
        )}

        {showSuccessMessage && (
          <div className=" bg-green-300 h-12  rounded-md flex items-center pl-4 pr-4">
            <p className="text-green-800">Genre succesvol aangemaakt!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGenre;
