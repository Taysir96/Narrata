import React from "react";
import Head from "next/head";
import SignupForm from "../components/SignupForm";

const signup = () => {
  return (
    <>
      <Head>
        <title>Narrata Platform - Registreer</title>
      </Head>
      <div>
        <SignupForm />
      </div>
    </>
  );
};

export default signup;
