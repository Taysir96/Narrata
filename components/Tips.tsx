import React, { useState, useEffect, useContext } from "react";
import "../styles/tips.css";
import { getAllTips, uploadTip } from "../lib/tips";
import "../styles/UploadReadingForm.css";

const Tips = () => {
  const [fetchedTips, setFetchedTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTips = async () => {
      console.log("Fetching tips data...");
      try {
        const data: any = await getAllTips();
        setFetchedTips(data);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("tips", JSON.stringify(data));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tips:", error);
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      const savedTips = sessionStorage.getItem("tips");
      if (savedTips) {
        setFetchedTips(JSON.parse(savedTips));
        setLoading(false);
      } else {
        fetchTips();
      }
    }
  }, []);

  return (
    <div className="tips-page-container">
      <h2>Tips voor de voorlezer</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : fetchedTips.length > 0 ? (
        <div className="tips-grid-container">
          {fetchedTips.map((tip, index) => (
            <div className="tip-container" key={index}>
              <div className="tip-header-container">
                <h3>{tip.title}</h3>
              </div>
              <div className="tip-paragraph-container">
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No tips found.</p>
      )}
      
    </div>
  );
};

export default Tips;
