import React from "react";
import Head from "next/head";
import SigninForm from "../components/SigninForm";

const signin = () => {
  return (
    <>
      <Head>
        <title>Narrata Platform - Aanmelden</title>
      </Head>
      <div>
        <SigninForm />
      </div>
    </>
  );
};

export default signin;
