import Head from "next/head";
import ResetForm from "../components/ResetForm";

const reset = () => {
  return (
    <>
      <Head>
        <title>Narrata Platform - Wachtwoord Herstel</title>
      </Head>
      <div>
        <ResetForm />
      </div>
    </>
  );
};

export default reset;
