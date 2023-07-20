import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  deleteReading,
  getAllReadings,
  updateReadingStatus,
} from "../../lib/reading";
import { Timestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import ApproveModal from "./modals/ApproveModal";
import BlockModal from "./modals/BlockModal";
import DeleteModal from "./modals/DeleteModal";

function Readings({ selectedTab }: { selectedTab: string }) {
  const [fetchedReadings, setFetchedReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("In Wacht");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedTab === "readings") {
      console.log("readings selected");
      const fetchReadings = async () => {
        try {
          const data: any = await getAllReadings();
          setFetchedReadings(data);
        } catch (error) {
          console.error("Error fetching readings:", error);
        }
      };

      fetchReadings();
      console.log(fetchedReadings);
    }
  }, [selectedTab]);

  const handleRowClick = (reading) => {
    setSelectedReading(reading);
    setSelectedVideoIndex(0); // Reset the selected video index
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilterStatus(event.target.value);
  };

  const tableTitles = ["Titel", "Gebruiker", "Aantal Video's", "Status"];
  const statusOptions = ["Alles", "In Wacht", "Goedgekeurd", "Geblokkeerd"];
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "In Wacht":
        return "bg-yellow-300";
      case "Goedgekeurd":
        return "bg-green-300";
      case "Geblokkeerd":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  // Filter the readings based on search query and filter status
  const filteredReadings = fetchedReadings.filter(
    (reading) =>
      (reading.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reading.username.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === "Alles" || reading.status === filterStatus)
  );

  const renderActionButton = () => {
    if (selectedReading.status === "In Wacht") {
      return (
        <button
          onClick={() => setShowApproveModal(true)}
          className="px-4 py-2 mr-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Goedkeuren
        </button>
      );
    } else if (selectedReading.status === "Goedgekeurd") {
      return (
        <button
          onClick={() => setShowBlockModal(true)}
          className="px-4 py-2 mr-2 text-sm bg-zinc-400 text-white rounded hover:bg-zinc-500"
        >
          Blokkeren
        </button>
      );
    } else if (selectedReading.status === "Geblokkeerd") {
      return (
        <button
          onClick={() => setShowApproveModal(true)}
          className="px-4 py-2 mr-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Opnieuw Goedkeuren
        </button>
      );
    }
  };

  const handleApprove = async () => {
    console.log("goedkeuren");
    await updateReadingStatus(selectedReading.reading_id, "Goedgekeurd");
    setShowApproveModal(false);
    window.location.reload();
  };

  const handleBlock = async () => {
    console.log("goedkeuren");
    await updateReadingStatus(selectedReading.reading_id, "Geblokkeerd");
    setShowApproveModal(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    console.log("verwijderen");
    await deleteReading(selectedReading.reading_id);
    setShowDeleteModal(false);
    window.location.reload();
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2>Voorlezingen</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Zoek op titel of gebruikersnaam"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        {fetchedReadings.length > 0 ? ( // Render the table only when fetchedReadings has data
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
                {filteredReadings.map((reading, index) => (
                  <tr
                    key={reading.reading_id}
                    onClick={() => handleRowClick(reading)}
                    className={`cursor-pointer hover:bg-yellow-100 ${
                      selectedReading === reading ? "bg-yellow-200" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {reading.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {reading.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {reading.videoFiles.length}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-black ${getStatusColorClass(
                        reading.status
                      )}`}
                    >
                      {reading.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p> // Render a loading message while data is being fetched
        )}
      </div>
      {selectedReading && (
        <div className="video-preview mb-40">
          <div className="flex items-center justify-between">
            <h2 className="">
              Details{" "}
              <span
                className={`inline-block px-2 py-1 ml-2 text-sm font-normal rounded text-black ${
                  selectedReading.status === "Goedgekeurd"
                    ? "bg-green-300"
                    : selectedReading.status === "Geblokkeerd"
                    ? "bg-red-300"
                    : "bg-yellow-300"
                }`}
              >
                {selectedReading.status}
              </span>
            </h2>
            <div>
              {renderActionButton()}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Verwijderen
              </button>
            </div>
          </div>
          <h3 className="mt-4">
            {" "}
            <span className="font-semibold text-yellow-500">Titel:</span>{" "}
            {selectedReading.title}
          </h3>
          <p>
            {" "}
            <span className="font-semibold text-yellow-500">
              Gebruiker:
            </span>{" "}
            {selectedReading.username}
          </p>

          {/* Video Showcase */}
          <div className="flex items-center justify-center mt-4">
            <div className="relative w-full" style={{ height: "400px" }}>
              <video
                src={selectedReading.videoFiles[selectedVideoIndex].url}
                controls
                className="w-full h-full object-cover"
              />
              <p className="absolute top-0 left-0 p-2 z-10 text-white bg-black bg-opacity-50">
                {selectedReading.videoFiles[selectedVideoIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Thumbnails and Properties */}
          <div className="">
            <div className="w-full ">
              <div className="flex flex-auto gap-4 mt-2 w-full overflow-x-auto  p-1 ">
                {selectedReading.videoFiles.map((videoFile, index) => (
                  <div
                    onClick={() => setSelectedVideoIndex(index)}
                    key={index}
                    className={`flex-shrink-0 h-40 w-64 mt-2 mb-2 cursor-pointe relative  rounded bg-blue-900 ${
                      index === selectedVideoIndex
                        ? "ring-2 ring-yellow-500"
                        : ""
                    }`}
                  >
                    <img
                      src={selectedReading.thumbnailUrl}
                      className="w-full h-full object-cover"
                    />
                    <p className="absolute top-0 left-0 p-2 text-sm text-white bg-black bg-opacity-50">
                      {videoFile.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr className="border-1 border-yellow-400 mt-4 mb-4"></hr>
            <p className="w-full">
              {" "}
              <span className="font-semibold text-yellow-500">
                Beschrijving:
              </span>{" "}
              {selectedReading.description}
            </p>
            <div className="w-full mt-4 flex flex-row gap-10">
              <ul>
                <li className="capitalize">
                  <span className="font-semibold text-yellow-500">Taal:</span>{" "}
                  {selectedReading.language}
                </li>
                <li className="capitalize">
                  <span className="font-semibold text-yellow-500">
                    Dialect:
                  </span>{" "}
                  {selectedReading.selectedDialect}
                </li>
              </ul>
              <ul>
                <li className="capitalize">
                  <span className="font-semibold text-yellow-500 ">Genre:</span>{" "}
                  {selectedReading.genre}
                </li>
                <li>
                  <span className="font-semibold text-yellow-500">
                    Leeftijdsgroep:
                  </span>{" "}
                  {selectedReading.ageGroup.min} t.e.m.{" "}
                  {selectedReading.ageGroup.max}
                </li>
                {/* Add other properties here */}
              </ul>
              <ul>
                <li className="capitalize">
                  <span className="font-semibold text-yellow-500 ">
                    Aangemaakt op:
                  </span>{" "}
                  {selectedReading.createdAt.toString()}
                </li>

                {/* Add other properties here */}
              </ul>
            </div>
          </div>
        </div>
      )}
      {showApproveModal && (
        <ApproveModal
          handleApprove={handleApprove}
          setShowApproveModal={setShowApproveModal}
        />
      )}
      {showBlockModal && (
        <BlockModal
          handleBlock={handleBlock}
          setShowBlockModal={setShowBlockModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}

export default Readings;
