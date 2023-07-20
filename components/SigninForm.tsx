import React, { useState, useContext } from "react";
import { loginUser } from "../lib/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/signin.css";
import { error } from "console";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = null;
      response = await loginUser(email, password);
      // Set success message
      setMessageStatus("success");
      setMessage("Login succesvol!");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error: any) {
      setMessageStatus("danger");
      if (error.message == "Firebase: Error (auth/user-not-found).") {
        setMessage("Deze gebruiker is niet gevonden");
      }
      if (error.message == "Firebase: Error (auth/wrong-password).") {
        setMessage("Verkeerd wachtwoord");
      }
      // setMessage(error.message);
    }
  };
  return (
    <>
      <div className="signin-container">
        <div className="logo-signin-container">
          <img src="../images/logo-login.png" />
        </div>
        <h1>Aanmelden</h1>
        <div className="signin-form-container">
          <form onSubmit={onSubmit} className="signin-form">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Wachtwoord"
                required
              />
              <img
                src={
                  showPassword
                    ? "../images/Icon-eye-off.svg"
                    : "../images/Icon-eye.svg"
                }
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
              />
            </div>
            <button type="submit" className="button btn-signin">
              Aanmelden
            </button>
          </form>
          <p>
            <Link href="/reset">
              {" "}
              <u>Wachtwoord vergeten?</u>
            </Link>
          </p>
          <p>
            Nog geen account?{" "}
            <Link href="/signup">
              <u>Registreer</u>
            </Link>
          </p>
          <h4 className={`alertErr ${message !== "" ? "show" : ""}`}>
            {message}
          </h4>
          {/* {message !== "" && (
        <Alert className="mt-4" variant={messageStatus}>
          {message}
        </Alert>
      )} */}
        </div>
      </div>
    </>
  );
};

export default SigninForm;
