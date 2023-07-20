import { NextComponentType } from "next";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { logoutUser } from "../lib/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";

const Navigation: NextComponentType = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [userObject, setUserObject] = useState();
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.uid == undefined || user?.uid == null) return;
        const res = await fetch(`/api/users/${user.uid}`);
        const data = await res.json();
        setUserObject(data);
        setUsername(data.username);
      } catch (e) {
        console.error("Error fetching user object: ", e);
      }
    };
    fetchData();
  }, [user]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    logoutUser();
  };

  return (
    <nav className="bg-body-tertiary bg-black">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-white font-bold">
            Narrata-Platform
          </Link>

          <button
            className="lg:hidden"
            onClick={toggleDropdown}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6 fill-current text-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={!isDropdownOpen ? "block" : "hidden"}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
              <path
                className={isDropdownOpen ? "block" : "hidden"}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            </svg>
          </button>
          <div
            className={`lg:flex items-center ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul className="lg:flex items-center space-x-4 mt-4 lg:mt-0">
              <li>
                <a href="#home" className="text-white">
                  Link
                </a>
              </li>
              <li>
                <a href="#link" className="text-white">
                  Link
                </a>
              </li>
              {user ? (
                <li className="relative">
                  <button
                    className="text-white flex justify-center align-middle"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                  >
                    {username}
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-current"
                        d="M9.41 8.59L12 11.17l2.59-2.58L16 9l-4 4-4-4 1.41-1.41L9 9l.41-.42z"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <ul className="absolute left-0 mt-2 bg-black text-white rounded-md p-2 space-y-2 w-40">
                      <li>
                        <Link href="/profile">Bekijk profiel</Link>
                      </li>

                      <li>
                        <hr className="my-1" />
                      </li>
                      <li>
                        <button type="button" onClick={handleSignOut}>
                          Afmelden
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li>
                  <Link href="/signin" className="text-white">
                    Aanmelden
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
