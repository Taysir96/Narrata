import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const UploadSuccess = () => {
  const [isCheckIconVisible, setIsCheckIconVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCheckIconVisible(true);
    }, 100); // Stel de gewenste vertraging in (in milliseconden)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="steps-container step5">
      <h3>Voorlezing succesvol aangemaakt!</h3>
      <div className="CheckIconContainer">
        <AnimatedCheckIcon isVisible={isCheckIconVisible} />
      </div>
    </div>
  );
};
function AnimatedCheckIcon({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "tween",
            duration: 1, // Duur van 1 seconde
            ease: "easeOut",
          }}
          className="CheckCircle"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="-33 -3 100 30"
            strokeWidth={1.5}
            stroke="lightgreen"
            className="CheckIcon"
          >
            <motion.circle
              cx="15.5"
              cy="12"
              r="10"
              initial={{ strokeDasharray: "0 100" }}
              animate={{ strokeDasharray: "100 100" }}
              exit={{ strokeDasharray: "0 100" }}
              transition={{
                type: "tween",
                duration: 1, // Duur van 1 seconde
                ease: "easeOut",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.7, // Duur van 0.5 seconde
                ease: "easeOut",
                delay: 0.7, // Vertraging van 0.5 seconde na cirkelanimatie
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l4 4 8-8"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default UploadSuccess;
