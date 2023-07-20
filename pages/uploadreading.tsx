import React from "react";
import Head from "next/head";
import UploadReadingForm from "../components/UploadReadingForm";
import Link from "next/link";
import "../styles/index.css";

const uploadReading = () => {
  return (
    <>
      <Head>
        <title>Narrata Platform - Voorlezing Aanmaken</title>
      </Head>
      <div className="logo-top">
        <Link href="/">
          <img src="../images/logo-login.png" />
        </Link>
      </div>
      <h2 className="uploadReading-title">Voorlezing aanmaken</h2>
      <div className="uploadReading-container">
        <UploadReadingForm />
      </div>
    </>
  );
};

export default uploadReading;
