import React from "react";
import Head from "next/head";
import Tips from "../components/Tips";

const tips = () => {
  return (
    <>
      <Head>
        <title>Narrata Platform - Tips</title>
      </Head>
      <div>
        <Tips />
      </div>
    </>
  );
};

export default tips;
