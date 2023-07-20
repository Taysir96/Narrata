import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Tips from "./AdminDashboard/Tips";
import Language_Dialect from "./AdminDashboard/Language_Dialect";
import Users from "./AdminDashboard/Users";
import Readings from "./AdminDashboard/Readings";
import Genres from "./AdminDashboard/Genres";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("readings");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="m-4">
      <ul className="nav nav-pills" style={{ display: "flex", gap: "25px" }}>
        <li className="nav-item">
          <button
            className={`transition duration-150 ease-out hover:ease-in nav-link ${
              selectedTab === "readings" ? "active" : ""
            }`}
            onClick={() => handleTabChange("readings")}
          >
            Voorlezingen
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`transition duration-150 ease-out hover:ease-in nav-link ${
              selectedTab === "tips" ? "active" : ""
            }`}
            onClick={() => handleTabChange("tips")}
          >
            Tips
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`transition duration-150 ease-out hover:ease-in nav-link ${
              selectedTab === "language&dialect" ? "active" : ""
            }`}
            onClick={() => handleTabChange("language&dialect")}
          >
            Taal & dialect
          </button>
        </li>
        <li className="transition duration-150 ease-out hover:ease-in nav-item">
          <button
            className={`nav-link ${selectedTab === "genres" ? "active" : ""}`}
            onClick={() => handleTabChange("genres")}
          >
            Genres
          </button>
        </li>
        <li className="transition duration-150 ease-out hover:ease-in nav-item">
          <button
            className={`nav-link ${selectedTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("users")}
          >
            Gebruikers
          </button>
        </li>
      </ul>
      <hr className="border-t border-gray-300 mt-8"></hr>

      <div className="mt-4">
        {selectedTab === "readings" && <Readings selectedTab={selectedTab} />}
        {selectedTab === "tips" && <Tips selectedTab={selectedTab} />}
        {selectedTab === "language&dialect" && <Language_Dialect />}
        {selectedTab === "genres" && <Genres selectedTab={selectedTab} />}
        {selectedTab === "users" && <Users selectedTab={selectedTab} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
