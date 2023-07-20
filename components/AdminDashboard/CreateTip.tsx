import React, { useState, useRef } from "react";
import { uploadTip } from "../../lib/tips";
const CreateTip = ({ refreshTipsData }: { refreshTipsData: any }) => {
  const [alertMessage, setAlertMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] =
    React.useState<boolean>(false);

  // useRef inputs
  const inputRefTitle: any = useRef();
  const inputRefDescription: any = useRef();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleAddClick = async () => {
    const newTip = {
      title: title,
      description: description,
    };

    await uploadTip(newTip);
    refreshTipsData();
    inputRefTitle.current.value = "";
    inputRefDescription.current.value = "";
    setTitle("");
    setDescription("");
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
      <h2>Tip Toevoegen</h2>
      <div className="mt-7">
        <label className="block mb-2 font-medium">Titel</label>
        <input
          ref={inputRefTitle}
          placeholder="Een korte titel voor deze tip..."
          type="text"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Beschrijving</label>
        <textarea
          ref={inputRefDescription}
          placeholder="Een korte beschrijving voor deze tip..."
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          rows={4}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div className="flex  gap-4 h-fit w-full ">
        {title || description ? (
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
            <p className="text-green-800">Tip succesvol aangemaakt!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTip;
