import React from "react";
import Head from "next/head";
import "../styles/welcome.css";
import Link from "next/link";

function Welcome() {
  return (
    <>
      <Head>
        <title>Welkom</title>
      </Head>
      <div className="welcome-container">
        <div className="left">
          <div className="logo-welcome-container">
            <img src="../images/logo-welkom.png" />
          </div>
          <div className="frog-container">
            <img src="../images/kikker.png" />
          </div>
        </div>
        <div className="right">
          <h1 className="welcome-title">Welkom</h1>
          <div className="welcome-button-container">
            <Link href="/" passHref>
              <button>Ontdek de verhalen</button>
            </Link>
            <img src="../images/hand.svg" className="hand" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
