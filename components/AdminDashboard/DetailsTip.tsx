import React, { useEffect, useState } from "react";
import { updateTip, deleteTip } from "../../lib/tips";

const DetailsTip = ({
  selectedTip,
  refreshTipsData,
  setOpenDetailsTip,
}: {
  selectedTip: any;
  refreshTipsData: any;
  setOpenDetailsTip: any;
}) => {
  const [title, setTitle] = useState(selectedTip.title);
  const [description, setDescription] = useState(selectedTip.description);
  const [showSuccessMessage, setShowSuccessMessage] =
    React.useState<boolean>(false);

  useEffect(() => {
    setTitle(selectedTip.title);
    setDescription(selectedTip.description);
  }, [selectedTip]);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleUpdateClick = async () => {
    const updatedTip = {
      ...selectedTip,
      title: title,
      description: description,
    };

    await updateTip(selectedTip.tip_id, updatedTip);
    refreshTipsData();
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const handleDeleteClick = async () => {
    await deleteTip(selectedTip.tip_id);
    setOpenDetailsTip(false);
    refreshTipsData();
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
      <h2>Details tip</h2>
      <div className="mt-7">
        <label className="block mb-2 font-medium">Titel</label>
        <input
          value={title}
          placeholder="Een korte titel voor deze tip..."
          type="text"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Beschrijving</label>
        <textarea
          value={description}
          placeholder="Een korte beschrijving voor deze tip..."
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          rows={4}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div className="flex  gap-4 h-fit w-full ">
        <button
          className="bg-yellow-500 mb-4 h-12"
          type="button"
          onClick={handleUpdateClick}
        >
          Aanpassen
        </button>
        <button
          className="bg-red-500 mb-4 h-12 text-white"
          type="button"
          onClick={handleDeleteClick}
        >
          Verwijderen
        </button>
        {showSuccessMessage && (
          <div className=" bg-green-300 h-12  rounded-md flex items-center pl-4 pr-4">
            <p className="text-green-800">Tip succesvol bewerkt!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsTip;
