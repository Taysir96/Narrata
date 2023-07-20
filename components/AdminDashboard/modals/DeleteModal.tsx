import React from "react";

const DeleteModal = ({
  handleDelete,
  setShowDeleteModal,
}: {
  handleDelete: () => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 max-w-md">
        <h3 className="text-black">Voorlezing blokkeren?</h3>
        <p className="text-black">
          Bent u zeker dat u deze voorlezing wilt verwijderen? Hiermee zal u
          deze permanent verwijderen uit de database en zal de gebruiker de
          voorlezing verliezen.
        </p>
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-200"
          >
            Annuleren
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="px-4 py-2 mr-2 text-sm bg-red-500 text-white rounded hover:bg-green-600"
          >
            ja, verwijderen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
