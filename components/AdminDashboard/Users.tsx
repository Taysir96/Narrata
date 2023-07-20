import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/users";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheck,
  faCross,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Users = ({ selectedTab }: { selectedTab: string }) => {
  const [fetchedTips, setFetchedTips] = useState(() => {
    const savedTips = sessionStorage.getItem("users");
    return savedTips ? JSON.parse(savedTips) : [];
  });
  const [selectedTip, setSelectedTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tableTitles = ["Naam", "Email", "Voorlees Rechten", "Admin Rechten"];
  const uploadRightsTableTitles = ["Voorlees rechten", ""];
  const [loading, setLoading] = useState(true); // New state variable

  useEffect(() => {
    if (selectedTab === "users") {
      const fetchTips = async () => {
        console.log(
          "nothing saved yet in the session storage, so we fetch the data"
        );
        try {
          const data: any = await getAllUsers();
          setFetchedTips(data);
          sessionStorage.setItem("users", JSON.stringify(data)); // Save fetched tips in sessionStorage
          setLoading(false); // Set loading state to false when data is fetched
        } catch (error) {
          console.error("Error fetching tips:", error);
          setLoading(false); // Set loading state to false in case of error
        }
      };

      if (!fetchedTips.length) {
        fetchTips();
      } else {
        setLoading(false); // Set loading state to false if tips are already available in sessionStorage
      }
    }
  }, [selectedTab, fetchedTips]);

  const handleRowClick = (tip) => {
    setSelectedTip(tip);
    // Reset the selected video index
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTips = fetchedTips?.filter(
    (tip) =>
      tip.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUploadRightStatus = (status: boolean) => {
    if (status === true) {
      return (
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCheck}
          className="bg-green-500 p-3 align-middle m-0 rounded-lg"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCancel}
          className="bg-slate-500 opacity-50 p-3 align-middle m-0 rounded-lg"
        />
      );
    }
  };

  const renderAdminRightStatus = (status: string) => {
    if (status === "admin") {
      return (
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCheck}
          className="bg-green-500 p-3 align-middle m-0 rounded-lg "
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCancel}
          className="bg-slate-500 opacity-50 p-3 align-middle m-0 rounded-lg"
        />
      );
    }
  };

  const renderActionButton = () => {
    if (selectedTip.uploadRight === true && selectedTip.role === "admin") {
      return (
        <>
          <button
            onClick={() => setShowBlockModal(true)}
            className="px-4 py-2 mr-2 text-sm bg-zinc-400 text-white rounded hover:bg-zinc-500"
          >
            Voorlees rechten afnemen
          </button>
          <button
            onClick={() => setShowBlockModal(true)}
            className="px-4 py-2 mr-2 text-sm bg-zinc-400 text-white rounded hover:bg-zinc-500"
          >
            Admin rechten afnemen
          </button>
        </>
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2>Gebruikers</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 h-fit">
          <input
            type="text"
            placeholder="Zoek op naam, email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full h-12"
          />
        </div>
        {loading ? ( // Show loading message while fetching tips
          <p>Even geduld...</p>
        ) : fetchedTips?.length > 0 ? ( // Render the table only when fetchedReadings has data
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {tableTitles.map((tableTitle) => (
                    <th
                      key={tableTitle}
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {tableTitle}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTips.map((tip, index) => (
                  <tr
                    key={tip.title}
                    onClick={() => handleRowClick(tip)}
                    className={`cursor-pointer hover:bg-yellow-100 ${
                      selectedTip === tip ? "bg-yellow-200" : ""
                    }`}
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-black">
                      {tip.username}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-black">
                      {tip?.email}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-black text-center">
                      {renderUploadRightStatus(tip.uploadRight)}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-black text-center">
                      {renderAdminRightStatus(tip.role)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      {selectedTip ? (
        <div>
          {" "}
          <div className="flex items-center justify-between">
            <h2 className="">Details</h2>
            <div>{renderActionButton()}</div>
          </div>
          <h3 className="mt-4">
            {" "}
            <span className="font-semibold text-yellow-500">Naam:</span>{" "}
            {selectedTip.username}
          </h3>
          <p>
            {" "}
            <span className="font-semibold text-yellow-500">Email:</span>{" "}
            {selectedTip.email}
          </p>
          <hr className="border-1 border-yellow-400 mt-4 mb-4"></hr>
          <p className="flex items-center mb-4">
            {" "}
            <span className="font-semibold text-yellow-500">
              Voorlees rechten:
            </span>{" "}
            {selectedTip.uploadRight ? (
              <FontAwesomeIcon
                style={{ color: "green" }}
                icon={faCheck}
                className="bg-green-500 p-1 align-middle m-0 rounded-sm   ml-4"
              />
            ) : (
              <FontAwesomeIcon
                style={{ color: "green" }}
                icon={faCancel}
                className="bg-slate-500 opacity-50 p-1 align-middle m-0 rounded-sm  ml-4"
              />
            )}
          </p>
          <p className="flex items-center">
            {" "}
            <span className="font-semibold text-yellow-500">
              Admin rechten:
            </span>{" "}
            {selectedTip.role === "admin" ? (
              <FontAwesomeIcon
                style={{ color: "green" }}
                icon={faCheck}
                className="bg-green-500 p-1 align-middle m-0 rounded-sm ml-4 "
              />
            ) : (
              <FontAwesomeIcon
                style={{ color: "green" }}
                icon={faCancel}
                className="bg-slate-500 opacity-50 p-1 align-middle m-0 rounded-sm  ml-4"
              />
            )}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Users;
