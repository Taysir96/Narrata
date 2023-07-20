import React, { useEffect, useState } from "react";
import { updateGenre, deleteGenre } from "../../lib/genres";

const DetailsGenre = ({
  selectedTip,
  refreshTipsData,
  setOpenDetailsTip,
  setSelectedTip,
}: {
  selectedTip: any;
  refreshTipsData: any;
  setOpenDetailsTip: any;
  setSelectedTip: any;
}) => {
  const [title, setTitle] = useState(selectedTip.title);

  const [showNoChangeMessage, setShowNoChangeMessage] =
    React.useState<boolean>(false);

  useEffect(() => {
    setTitle(selectedTip.title);
  }, [selectedTip]);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUpdateClick = async () => {
    if (title === selectedTip.title) {
      setShowNoChangeMessage(true);
    } else {
      const updatedTip = {
        ...selectedTip,
        title: title,
      };

      await updateGenre(selectedTip.tip_id, updatedTip);

      setSelectedTip(null);
      refreshTipsData();
      setOpenDetailsTip(false);
    }
    setTimeout(() => {
      setShowNoChangeMessage(false);
    }, 5000);
  };

  const handleDeleteClick = async () => {
    await deleteGenre(selectedTip.tip_id);
    setSelectedTip(null);
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
      <h2>Details Genre</h2>
      <div className="mt-7">
        <label className="block mb-2 font-medium">Naam</label>
        <input
          value={title}
          placeholder="Een korte titel voor deze tip..."
          type="text"
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          onChange={handleTitleChange}
        />
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

        {showNoChangeMessage && (
          <div className=" bg-blue-300 h-12  rounded-md flex items-center pl-4 pr-4">
            <p className="text-blue-900">Er is niets aangepast in de naam.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsGenre;
