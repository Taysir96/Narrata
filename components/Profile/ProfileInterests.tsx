import React from "react";

const ProfileInterests = ({ interests }: { interests: any }) => {
  return (
    <>
      <div className="profileInterests-container">
        <h3>Interesses:</h3>
        {!interests ? (
          <p>nog geen...</p>
        ) : (
          <>
            <p>{...interests.join(", ")}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileInterests;
