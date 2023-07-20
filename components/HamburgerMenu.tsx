import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../lib/context";
import { logoutUser } from "../lib/auth";
import { getAllFollowedProfiles } from "../lib/subscriptions";
import "../styles/HamburgerMenu.css";
import Link from "next/link";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const { user, userData, followingProfiles } = useContext(UserContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const DesktopToggleProfile = () => {
    setDesktopProfileOpen(!desktopProfileOpen);
  };
  const handleSignOut = () => {
    logoutUser();
  };

  return (
    <>
      <div className="hamburgerMenu-container">
        <div className="icon-menu-container">
          <img src="../images/Icon-feather-menu.svg" onClick={toggleMenu} />
        </div>
        <div className={`menu-items ${menuOpen ? "open" : ""}`}>
          <img
            src="../images/Icon-close.svg"
            className="icon-close"
            onClick={closeMenu}
          />
          <nav>
            <div className="logo-container">
              <Link href="/">
                <img src="../images/logo-login.png" />
              </Link>
            </div>
            <ul>
              <li>
                <img src="../images/Icon-home.svg" />
                <a href="/">Home</a>
              </li>
              <li>
                <img src="../images/Icon-globe.svg" />
                <a href="">Taal en dialectengids</a>
              </li>
              <li>
                <img src="../images/Icon-tips.svg" />
                <a href="/tips">Tips</a>
              </li>
              <li>
                <img src="../images/Icon-file-upload.svg" />
                <a href="/uploadreading">Voorlezing aanmaken</a>
              </li>
              {userData && userData.role === "user" && (
                <>
                  <li>
                    <img src="../images/Icon-email.svg" />
                    <a href="">Contacteer ons</a>
                  </li>
                </>
              )}
              {userData && userData.role === "admin" && (
                <li>
                  <img src="../images/Icon-dashboard.svg" />
                  <a href="/admin">Admin Dashboard</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="icon-profile-container">
          <img
            src={
              user
                ? `../images/Icon-user-check.svg`
                : `../images/Icon-user-minus.svg`
            }
            onClick={toggleProfile}
          />
        </div>
        <div className={`profile-items ${profileOpen ? "openProfile" : ""}`}>
          <img
            src="../images/Icon-close.svg"
            className="icon-close-profile"
            onClick={closeMenu}
          />
          <nav>
            <div className="logo-container">
              <Link href="/">
                <img src="../images/logo-login.png" />
              </Link>
            </div>
            {user ? (
              <ul>
                <Link href={`/profile/${user?.uid}`}>
                  <li className="edit-profile-li">
                    <img src="../images/Icon-user-edit.svg" />
                    <a>Bekijk profiel</a>
                  </li>
                </Link>
                <li>
                  <img src="../images/Icon-log-out.svg" />
                  <a href="" onClick={handleSignOut}>
                    Afmelden
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <img src="../images/Icon-log-in.svg" />
                  <a href="/signin">Aanmelden</a>
                </li>
                <li>
                  <img src="../images/Icon-user-plus.svg" />
                  <a href="signup">Registreer</a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
      <div className="desktop-nav">
        <div className="desktop-logo-container">
          <Link href="/">
            <img src="../images/logo-login.png" />
          </Link>
        </div>
        <div className="desktop-items-container">
          <nav>
            <ul>
              <li>
                <img src="../images/Icon-home.svg" />
                <a href="/">Home</a>
              </li>
              <li>
                <img src="../images/Icon-globe.svg" />
                <a href="">Taal en dialectengids</a>
              </li>
              <li>
                <img src="../images/Icon-tips.svg" />
                <a href="tips">Tips</a>
              </li>
              <li>
                <img src="../images/Icon-file-upload.svg" />
                <a href="/uploadreading">Voorlezing aanmaken</a>
              </li>
              {userData && userData.role === "user" && (
                <>
                  <li>
                    <img src="../images/Icon-email.svg" />
                    <a href="">Contacteer ons</a>
                  </li>
                </>
              )}
              {userData && userData.role === "admin" && (
                <li>
                  <img src="../images/Icon-dashboard.svg" />
                  <a href="/admin">Admin Dashboard</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <hr />
        <div className="desktop-readers-container">
          <h2>Voorlezer</h2>
          <div className="desktop-readersPicture-container">
            {followingProfiles.map((followedProfile, index) => (
              <a href={`/profile/${followedProfile?.followingId}`} key={index}>
                <div className="desktop-readerPicture">
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
                  <p>{followedProfile.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="desktop-profile-container">
        <img
          src={
            user
              ? `../images/Icon-user-check.svg`
              : `../images/Icon-user-minus.svg`
          }
          onClick={DesktopToggleProfile}
        />
      </div>
      <div
        className={`desktop-profile-items ${
          desktopProfileOpen ? "desktop-openProfile" : ""
        }`}
      >
        <div className="info-user">
          <div className="user-picture">
            <img src="../images/default-profile.jpg" />
          </div>
          <div className="user-text">
            {user && userData ? (
              <h3>Welkom {userData.username}</h3>
            ) : (
              <h3>Dag bezoeker</h3>
            )}
            {user && userData ? <h4> {userData.email}</h4> : ""}
          </div>
        </div>
        <div className="user-items">
          <nav>
            {user ? (
              <ul>
                <Link href={`/profile/${user?.uid}`}>
                  <li>
                    <img src="../images/Icon-user-edit.svg" />
                    <a href="/profile">Bekijk profiel</a>
                  </li>
                </Link>

                <li>
                  <img src="../images/Icon-log-out.svg" />
                  <a href="" onClick={handleSignOut}>
                    Afmelden
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <img src="../images/Icon-log-in.svg" />
                  <a href="/signin">Aanmelden</a>
                </li>
                <li>
                  <img src="../images/Icon-user-plus.svg" />
                  <a href="signup">Registreer</a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
