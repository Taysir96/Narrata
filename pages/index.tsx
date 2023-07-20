import React, { useContext, useEffect, useState } from "react";
import "../styles/index.css";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { logoutUser } from "../lib/auth";
import Head from "next/head";
import Link from "next/link";
import HomeComponents from "../components/Home";

const Home: NextPage = () => {
  const router = useRouter();

  const { user, userData } = useContext(UserContext);

  const handleSignOut = () => {
    logoutUser();
  };

  // return <div>{user ? <h1>Welkom {username}</h1> : <h1>Dag bezoeker</h1>}</div>;
  return (
    <>
      <Head>
        <title>Narrata Platform - Home</title>
      </Head>

      {/* <div className="logo-top">
        <Link href="/">
          <img src="../images/logo-login.png" />
        </Link>
      </div> */}
      <HomeComponents />
    </>
  );
};

export default Home;
