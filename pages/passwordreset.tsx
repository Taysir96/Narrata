import Head from "next/head";
import PasswordReset from "../components/PasswordReset";

export default function PasswordResetPage() {
  return (
    <>
      <Head>
        <title>Final Show - Reset Password</title>
      </Head>
      <div>
        <PasswordReset />
      </div>
    </>
  );
}
