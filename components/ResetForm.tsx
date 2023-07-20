import React, { ReactElement, useState } from "react";
import { passwordReset } from "../lib/auth";
import "../styles/resetForm.css";
import Link from "next/link";

const ResetForm = () => {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"reset" | "reauthenticate">("reset");
  const [emailMessage, setEmailMessage] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let user = null;
    if (mode === "reset") {
      try {
        let data = await passwordReset(email);
        setEmailMessage(true);
        setMessage("");
      } catch (error: any) {
        if (error.code === "auth/user-not-found") {
          // alert("User not found, try again!");
          setMessage("Deze gebruiker is niet gevonden, probeer het opnieuw!");
        }
      }
    } else {
    }
  };

  return (
    <>
      <div className="resetForm-container">
        <div className="logo-reset-container">
          <img src="../images/logo-login.png" />
        </div>
        {emailMessage ? (
          <div>
            <h1>De email is verstuurd! </h1>
            <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
            <h2>Bekijk jouw Inbox!</h2>
            <br />
            <Link href="/signin">
              <button>Terug aanmelden</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="resetForm-form">
            {mode === "reset" ? <h2>Wachtwoord vergeten</h2> : <h2>Log in</h2>}
            <p>
              Je ontvangt van ons een e-mail met een link waarmee je je
              wachtwoord kunt resetten.
            </p>
            <hr></hr>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="naam@gmail.com"
              required
            />

            <button type="submit" className="button">
              Verstuur
            </button>
            <Link href="/signin">
              <p>
                Terug naar <u>Aanmelden</u>
              </p>
            </Link>
          </form>
        )}
        <h4 className={`alertErr ${message !== "" ? "show" : ""}`}>
          {message}
        </h4>
      </div>
    </>
  );
};

export default ResetForm;
