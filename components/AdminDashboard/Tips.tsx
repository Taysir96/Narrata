import React, { useState, useEffect } from "react";
import { getAllTips, uploadTip } from "../../lib/tips";
import { Timestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import ApproveModal from "./modals/ApproveModal";
import BlockModal from "./modals/BlockModal";
import DeleteModal from "./modals/DeleteModal";
import CreateTip from "./CreateTip";
import DetailsTip from "./DetailsTip";
import "../../styles/globals.css";

const Tips = ({ selectedTab }: { selectedTab: string }) => {
  const [fetchedTips, setFetchedTips] = useState(() => {
    const savedTips = sessionStorage.getItem("tips");
    return savedTips ? JSON.parse(savedTips) : [];
  });
  const [selectedTip, setSelectedTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateTipForm, setShowCreateTipForm] = useState(false);
  const [openDetailsTip, setOpenDetailsTip] = useState(false);
  const tableTitles = ["Titel", "Aangemaakt op", "Bewerkt op"];
  const [loading, setLoading] = useState(true); // New state variable

  useEffect(() => {
    if (selectedTab === "tips") {
      const fetchTips = async () => {
        console.log(
          "nothing saved yet in the session storage, so we fetch the data"
        );
        try {
          const data: any = await getAllTips();
          setFetchedTips(data);
          sessionStorage.setItem("tips", JSON.stringify(data)); // Save fetched tips in sessionStorage
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
    setShowCreateTipForm(false);
    setOpenDetailsTip(true);
    setSelectedTip(tip);
    // Reset the selected video index
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTips = fetchedTips?.filter((tip) =>
    tip.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const refreshTipsData = async () => {
    try {
      const data: any = await getAllTips();
      setFetchedTips(data);
      sessionStorage.setItem("tips", JSON.stringify(data)); // Save fetched tips in sessionStorage
      setLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.error("Error fetching tips:", error);
      setLoading(false); // Set loading state to false in case of error
    }
    console.log("test refresh");
  };
  // Filter the readings based on search query and filter status

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2>Tips</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 h-fit">
          <input
            type="text"
            placeholder="Zoek op titel"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full h-12"
          />
          <button
            className=" mb-4 h-12 bg-yellow-500"
            type="button"
            onClick={() => setShowCreateTipForm(true)}
          >
            {" "}
            Tip toevoegen
          </button>
        </div>
        {loading ? ( // Show loading message while fetching tips
          <p>Loading...</p>
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
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {tip.title}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {tip?.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {tip?.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tips found.</p>
        )}
      </div>
      {showCreateTipForm ? (
        <CreateTip refreshTipsData={refreshTipsData} />
      ) : selectedTip && openDetailsTip ? (
        <DetailsTip
          selectedTip={selectedTip}
          refreshTipsData={refreshTipsData}
          setOpenDetailsTip={setOpenDetailsTip}
        />
      ) : null}
    </div>
  );
};

export default Tips;
