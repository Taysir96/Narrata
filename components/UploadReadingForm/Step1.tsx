import React, { useEffect, useState } from "react";

const Step1 = ({
  formData,
  setFormData,
  isValid,
  setValid,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  isValid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [remainingChars, setRemainingChars] = useState(250);

  const validateForm = () => {
    // Perform validation checks
    const { title, description, genre } = formData;

    const isTitleValid = title.trim() !== "";
    const isDescriptionValid = description.trim() !== "";
    const isGenreValid = genre !== "";

    const isFormValid = isTitleValid && isDescriptionValid && isGenreValid;
    setValid(isFormValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputDescription = e.target.value;
    const remaining = 250 - inputDescription.length;

    if (remaining >= 0) {
      setRemainingChars(remaining);
      setFormData({ ...formData, description: inputDescription });
    }
  };

  return (
    <div className="steps-container step1">
      <h3>Stap 1: Inleiding</h3>
      <div className="step-content">
        <label>Titel van voorlezing: *</label>
        <input
          placeholder="vb. naam van een boek/verhaal"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="step-content">
        <label htmlFor="description">
          Beschrijving: * Resterend:{" "}
          <span style={{ color: "#fac215" }}>{remainingChars}</span>
        </label>
        <textarea
          style={{ minHeight: "4em" }}
          placeholder="Over wat gaat deze voorlezing?"
          value={formData.description}
          onChange={handleDescriptionChange}
          maxLength={250}
          id="description"
        />
      </div>
      <div className="step-content">
        <label htmlFor="Genre">Genre:</label>
        <select
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          id="Genre"
        >
          <option value="">Selecteer genre</option>
          <option value="fantasy">Fantasy</option>
          <option value="sciencefiction">Sciencefiction</option>
          <option value="non-fiction">Non-fictie</option>
          <option value="liefde">Liefde</option>
          <option value="misdaad">Misdaad</option>
          <option value="poetry">Poëzie</option>
          <option value="history">Historisch</option>
          <option value="religion">Religie</option>
        </select>
      </div>
    </div>
  );
};

export default Step1;
