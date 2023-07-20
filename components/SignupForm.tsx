import React, { useState, useContext } from "react";
import { registerUser } from "../lib/auth";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";
import "../styles/signup.css";
import { useRouter } from "next/router";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordRepeatVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = null;

      if (password != repeatPassword) {
        return setMessage("wachtwoorden komen niet overeen!");
      }

      response = await registerUser(email, password);

      // Set success message

      setMessageStatus("success");
      setMessage("Registratie voltooid!");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      router.push("/");
    } catch (error: any) {
      setMessageStatus("danger");

      setMessage(error.message);
    }
  };
  return (
    <>
      <div className="signup-container">
        <div className="logo-signup-container">
          <img src="../images/logo-login.png" />
        </div>
        <h1>Registreer</h1>
        <div className="signup-form-container">
          <form onSubmit={onSubmit} className="signup-form">
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
            <div className="password-container">
              <input
                type={showPasswordRepeat ? "text" : "password"}
                id="repeatPassword"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                placeholder="Wachtwoord bevestigen"
                required
              />
              <img
                src={
                  showPasswordRepeat
                    ? "../images/Icon-eye-off.svg"
                    : "../images/Icon-eye.svg"
                }
                alt="Toggle Password Visibility"
                onClick={togglePasswordRepeatVisibility}
              />
            </div>
            <button type="submit" className="button btn-signup">
              Account aanmaken
            </button>
          </form>

          <p>
            Al een account?{" "}
            <Link href="/signin">
              <u>Aanmelden</u>
            </Link>
          </p>

          <h4 className={`alertErr ${message !== "" ? "show" : ""}`}>
            {message}
          </h4>

          {/* {message !== "" ? <h4 className="alertErr">{message}</h4> : ""} */}
        </div>
      </div>
    </>
  );
};

export default SignupForm;
