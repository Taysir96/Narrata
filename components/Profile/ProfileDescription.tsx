import React from "react";

const ProfileDescription = ({ description }: { description: string }) => {
  return (
    <>
      <div className="profileDescription-container">
        <h3>Over mezelf:</h3>
        {!description && (
          <p className="text-white">
            Deze gebruiker heeft nog geen beschrijving.
          </p>
        )}
        {description && (
          <p className="line-clamp-3 text-ellipsis">{description}</p>
        )}
      </div>
    </>
  );
};

export default ProfileDescription;
