import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { confirmThePasswordReset } from "../lib/auth";
import "../styles/resetPassword.css";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

function PasswordReset() {
  /**
   * Extract oobCode from the URL.
   * Delete console.log in production.
   */
  //   const navigate = useNavigate()
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordRepeatVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  let oobCode: string | null = router.query.oobCode as string;

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      //   alert("Passwords did not match.");
      setMessage("wachtwoorden komen niet overeen!");
      return;
    }

    try {
      if (oobCode) {
        await confirmThePasswordReset(oobCode, confirmPassword);
        resetFormFields();
        setSuccessMessage(true);
        setMessage("");
      } else {
        // alert("Something is wrong; try again later!");
        setMessage("Er is iets fout; Probeer het later nogmaals.");
        console.log("missing oobCode");
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-action-code") {
        // alert("Something is wrong; try again later.");
        setMessage("Er is iets fout; Probeer het later nogmaals.");
      }
      console.log(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="resetPassword-container">
        <div className="logo-reset-container">
          <img src="../images/logo-login.png" />
        </div>
        {successMessage ? (
          <div>
            <h3>Succes! Uw wachtwoord is succesvol gewijzigd</h3>
            <br />
            <button
              type="button"
              className="button"
              onClick={() => router.push("/signin")}
            >
              Ga naar aanmelden
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="resetPassword-form">
            <h2>Stel nieuw wachtwoord in</h2>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nieuw wachtwoord"
                id="pwInput"
                name="password"
                value={password}
                onChange={handleChange}
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
                placeholder="Bevestig nieuw wachtwoord"
                id="confirmpwInput"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
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
            <button type="submit" className="button">
              Bevestig
            </button>
          </form>
        )}
        <h4 className={`alertErr ${message !== "" ? "show" : ""}`}>
          {message}
        </h4>
      </div>
    </>
  );
}

export default PasswordReset;
