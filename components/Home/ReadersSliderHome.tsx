import React, { useContext } from "react";
import "../../styles/ReadersSliderHome.css";
import { UserContext } from "../../lib/context";

function ReadersSliderHome() {
  const { user, userData, followingProfiles, fetchFollowingProfiles } =
    useContext(UserContext);

  const imageFiles = [
    "../images/pp.jpg",
    "../images/default-profile.jpg",
    "https://i.pinimg.com/564x/16/a4/53/16a453731aad48b83af2219909c3b612.jpg",
    "https://i.pinimg.com/564x/fc/f6/28/fcf6287ec439efd84281c8c29787e8bd.jpg",
    "https://i.pinimg.com/564x/96/fa/40/96fa40685b5fca98c6faf0a98a776be4.jpg",
    "https://i.pinimg.com/564x/73/7a/90/737a9051311fd6168d7b81064359b527.jpg",
  ];

  return (
    <>
      {followingProfiles.length > 0 && (
        <div className="readers-container">
          <h2>Voorlezer</h2>
          <div className="readersPicture-container">
            {user ? (
              <>
                {" "}
                {followingProfiles.map((followedProfile, index) => (
                  <a
                    href={`/profile/${followedProfile?.followingId}`}
                    key={index}
                  >
                    <div className="readerPicture text-center" key={index}>
                      {followedProfile?.profilePictureUrl ? (
                        <img
                          src={followedProfile?.profilePictureUrl}
                          alt="Profile Picture"
                          className="w-full rounded-full"
                        />
                      ) : (
                        <img
                          src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"
                          alt="Profile Picture"
                          className="w-full rounded-full"
                        />
                      )}
                      <p>{followedProfile?.username}</p>
                    </div>
                  </a>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ReadersSliderHome;
