import "../styles/globals.css";
// import Navigation from '../components/Navigation';
import "@fortawesome/fontawesome-svg-core/styles.css";
import Nav from "../components/HamburgerMenu";
import "react-bootstrap";
import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Head>
        <link rel="icon" href="../images/favicon-32x32.png" />
        <link rel="stylesheet" href="https://use.typekit.net/nbi2bjj.css" />
      </Head>
      <Nav />
      <div className="logo-top">
        <Link href="/">
          <img src="../images/logo-login.png" />
        </Link>
      </div>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
