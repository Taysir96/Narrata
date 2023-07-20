import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { getAllReadingsByUid } from "../../lib/reading";
import ProfileInterests from "../../components/Profile/ProfileInterests";
import ProfileDescription from "../../components/Profile/ProfileDescription";
import { UserContext } from "../../lib/context";
import {
  findSubscription,
  followUser,
  getFollowersAmount,
  unfollowUser,
} from "../../lib/subscriptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/ThumbnailVideos.css";
import {
  faAdd,
  faAddressBook,
  faBell,
  faEdit,
  faEye,
  faEyeDropperEmpty,
  faFolderPlus,
  faSubscript,
} from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "../../components/Profile/modals/EditProfileModal";
import SearchForm from "../../components/Home/SearchForm";
import ReadingCard from "../../components/ReadingCard";
import { useUserData } from "../../lib/hooks";
import "../../styles/profile.css";

interface ProfileData {
  username: string;
  uid: string;
  interests: string[];
  description: string;
  profilePictureUrl: string;
  // Add other properties as needed
}
const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [fetchedReadings, setFetchedReadings] = useState([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { user, userData, followingProfiles, fetchFollowingProfiles } =
    useContext(UserContext);
  const [isShowEditModal, setShowEditModal] = useState(false);
  // searchform
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReadings, setFilteredReadings] = useState([]); // Rename the state variable here
  const [displayedReadings, setDisplayedReadings] = useState(5); // Number of readings initially displayed
  // following logic
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [followersAmount, setFollowersAmount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const data: ProfileData = await response.json();
          if (Object.keys(data).length === 0) {
            router.push("/error"); // Redirect to error page if response is empty
          } else {
            setProfileData(data);
          }
        } else {
          router.push("/error"); // Redirect to error page if response is not successful
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/error"); // Redirect to error page if an error occurs
      }
    };

    const fetchReadings = async () => {
      try {
        const data: any = await getAllReadingsByUid(id);
        setFetchedReadings(data);
        // Log the fetched readings here
      } catch (error) {
        console.error("Error fetching readings:", error);
      }
    };

    const fetchSubscription = async () => {
      try {
        if (user) {
          if (user.uid != id) {
            const isFollowingProfile = await findSubscription(user.uid, id);

            setSubscriptionLoading(false);
            setIsFollowing(isFollowingProfile);
          } else {
          }
        }
        return;
      } catch (error) {
        console.error("Error fetching subscription", error);
      }
    };

    if (id) {
      fetchProfileData();
      fetchReadings();
      fetchSubscription();
    }
  }, [id, router, user]);

  useEffect(() => {
    const fetchFollowersAmount = async () => {
      if (id) {
        // Check if profileData exists before calling the function
        try {
          const data: any = await getFollowersAmount(id);
          setFollowersAmount(data);
          // Log the fetched followers amount here (optional)
        } catch (error) {
          console.error("Error fetching followers amount:", error);
        }
      }
    };
    fetchFollowersAmount(); // Move the fetchFollowersAmount call here
  }, [user, id]);

  const refreshProfileData = async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (response.ok) {
        const data: ProfileData = await response.json();
        if (Object.keys(data).length === 0) {
          router.push("/error"); // Redirect to error page if response is empty
        } else {
          setProfileData(data);
        }
      } else {
        router.push("/error"); // Redirect to error page if response is not successful
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/error"); // Redirect to error page if an error occurs
    }
  };

  useEffect(() => {
    const filterReadings = () => {
      const filtered = fetchedReadings.filter(
        (reading) =>
          reading.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reading.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reading.selectedDialect
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        // Add more conditions for filtering (e.g., language, selectedDialect)
      );
      setDisplayedReadings(5);
      setFilteredReadings(filtered);
    };

    filterReadings();
  }, [fetchedReadings, searchQuery]);

  const mostRecentReading = fetchedReadings.reduce(
    (prevReading, currReading) => {
      if (!prevReading || currReading.createdAt > prevReading.createdAt) {
        return currReading;
      }
      return prevReading;
    },
    null
  );

  const sortedReadings = fetchedReadings
    .filter((reading) => reading.views > 0) // Filter readings with views greater than 0
    .sort((a, b) => b.views - a.views); // Sort readings based on views in descending order

  const maxPopularReadings = Math.min(sortedReadings.length, 5); // Limit the maximum number of popular readings to 5 or the length of sortedReadings

  const popularReadings = sortedReadings.slice(0, maxPopularReadings);

  const handleShowMore = () => {
    setDisplayedReadings((prev) => prev + 5); // Increase the number of displayed readings by 5
  };

  const readingsToShow =
    filteredReadings.length > 0
      ? filteredReadings.slice(0, displayedReadings)
      : fetchedReadings.slice(0, displayedReadings);

  const shouldShowMoreButton = filteredReadings.length > displayedReadings;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const refreshFetchFollowersAmount = async () => {
    try {
      if (profileData) {
        try {
          const data: any = await getFollowersAmount(id);
          setFollowersAmount(data);
          // Log the fetched readings here
        } catch (error) {
          console.error("Error fetching followers amount:", error);
        }
      }
      return;
    } catch (error) {
      console.error("Error fetching followers amount", error);
    }
  };

  const handleFollowUnfollow = async () => {
    console.log("test button follow/unfollow");
    try {
      if (isFollowing) {
        console.log("I want to unfollow this user");
        await unfollowUser(user.uid, id);
      } else {
        console.log("I want to follow");
        await followUser(user.uid, id);
      }
      await fetchFollowingProfiles();
      refreshFetchFollowersAmount();
      // Update the isFollowing state using the callback function
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.error("Error following/unfollowing the user:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Narrata Platform - Profiel - {profileData?.username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="profile-container">
        <div>
          {profileData ? (
            <div>
              <div className="profile-information">
                <div className="profile-picture">
                  <div className="picture">
                    {profileData?.profilePictureUrl ? (
                      <>
                        <img
                          src={profileData?.profilePictureUrl}
                          alt="Profile Picture"
                        />
                        <p>{followersAmount} luisteraars</p>
                      </>
                    ) : (
                      <>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/narrata-platform-development.appspot.com/o/thumbnails%2Fpp.jpg?alt=media&token=99feb3a4-49b5-4d28-96db-49c2587a84ed"
                          alt="Profile Picture"
                        />
                        <p>{followersAmount} luisteraars</p>
                      </>
                    )}

                    {user && user.uid === profileData.uid && (
                      <div className="icon-edit">
                        <img
                          src="../images/Icon-edit.svg"
                          onClick={() => setShowEditModal(true)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-name">
                  <h2>{profileData.username}</h2>
                </div>
                <div className="follow-btn">
                  {user && user.uid === profileData.uid && (
                    <Link href={"/uploadreading"}>
                      <button className="profile-uploadreading-btn">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          className="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#132653"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        &nbsp; Voorlezing aanmaken
                      </button>
                    </Link>
                  )}
                  {!subscriptionLoading &&
                    user &&
                    user.uid !== profileData?.uid && (
                      <button
                        onClick={() => handleFollowUnfollow()}
                        className={
                          isFollowing ? "isFollowing" : "isFollowinghover"
                        }
                      >
                        {isFollowing ? "Niet meer volgen" : "Volgen"}
                      </button>
                    )}
                </div>
                <div>
                  <ProfileInterests interests={profileData?.interests} />
                </div>
                <div className="profile-hr">
                  <hr />
                </div>
                <div>
                  <ProfileDescription description={profileData?.description} />
                </div>
              </div>
              {/* <hr className="border-2 border-solid border-blue-900 mt-4 mb-4"></hr> */}
              <br />
              <br />
              <br />
              <br />
              {fetchedReadings ? (
                <>
                  {" "}
                  {fetchedReadings.length > 0 && mostRecentReading ? (
                    <div
                      className="ThumbnailVideos-container"
                      style={{ width: "100%", marginTop: "40px" }}
                    >
                      <h2>Nieuwste voorlezing</h2>
                      <div className="ThumbnailVideos-picture">
                        <ReadingCard
                          reading={mostRecentReading}
                          username={profileData?.username}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      {" "}
                      <p className="mt-4 text-center w-2/3 text-yellow-500">
                        Geen voorlezingen.
                      </p>
                    </div>
                  )}
                  {popularReadings.length > 0 ? (
                    <div
                      className="ThumbnailVideos-container"
                      style={{ width: "100%", marginTop: "40px" }}
                    >
                      <h2>Meest bekeken</h2>
                      <div className="ThumbnailVideos-picture">
                        {popularReadings.map((reading, index) => (
                          <ReadingCard
                            key={index}
                            reading={reading}
                            username={profileData?.username}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {fetchedReadings.length ? (
                    <>
                      <div
                        className="ThumbnailVideos-container-zoekresultaat flex justify-center flex-col"
                        style={{ width: "100%" }}
                      >
                        <h2>Alle voorlezingen</h2>
                        <input
                          type="text"
                          placeholder="Zoek op titel, taal of dialect..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="p-2 border border-gray-300 rounded-md mb-4 w-full h-12 text-black"
                        />
                        <div className="ThumbnailVideos-picture-zoekresultaat">
                          {readingsToShow.map((reading, index) => (
                            <ReadingCard
                              key={index}
                              reading={reading}
                              username={profileData?.username}
                            />
                          ))}
                        </div>
                        {shouldShowMoreButton && (
                          <button className="mt-10" onClick={handleShowMore}>
                            Toon meer...
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {isShowEditModal && (
          <EditProfileModal
            refreshProfileData={refreshProfileData}
            profileData={profileData}
            setShowEditModal={setShowEditModal}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
