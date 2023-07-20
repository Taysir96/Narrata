import React, { useEffect, useState } from "react";
import { getLanguageDialects } from "../../lib/dialects";
import ReactSlider from "react-slider";

const Step2 = ({
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
  const [dialectOptions, setDialectOptions] = useState<any[]>([]);
  const validateForm = () => {
    // Perform validation checks
    const { language, dialect, selectedDialect, ageGroup } = formData;

    const isLanguageValid = language !== "";
    const isDialectValid = !dialect || (dialect && selectedDialect !== "");
    const isAgeGroupValid = ageGroup.min >= 0 && ageGroup.max <= 100;

    const isFormValid = isLanguageValid && isDialectValid && isAgeGroupValid;
    setValid(isFormValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    const fetchDialects = async () => {
      if (formData.language) {
        try {
          const dialects = await getLanguageDialects(formData.language);
          setDialectOptions(dialects);
        } catch (error) {
          console.error("Error fetching dialects:", error);
        }
      }
    };

    fetchDialects();
  }, [formData.language]);

  const [ageValue, setAgeValue] = useState([0, 100]);
  const handleAgeChange = (value) => {
    setAgeValue(value);
  };

  return (
    <div className="steps-container step2">
      <h3>Stap 2: Taal en leeftijdsgroep</h3>
      <div className="step-content">
        <label>Taal:</label>
        <select
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
        >
          <option value="">Select Taal</option>
          <option value="dutch">Nederlands</option>
          <option value="spanish">Spaans</option>
          <option value="french">Frans</option>
          <option value="english">Engels</option>
        </select>
      </div>
      {dialectOptions.length > 0 && (
        <>
          <label className="step-content-dialect">Dialect?</label>
          <div className="step2-content">
            <div>
              <label>Nee</label>
              <input
                type="radio"
                value="no"
                checked={!formData.dialect}
                onChange={() =>
                  setFormData({
                    ...formData,
                    dialect: false,
                    selectedDialect: "",
                  })
                }
              />
            </div>
            <div>
              <label>Ja</label>
              <input
                type="radio"
                value="yes"
                checked={formData.dialect}
                onChange={() => setFormData({ ...formData, dialect: true })}
              />
            </div>
          </div>
        </>
      )}

      {formData.dialect && dialectOptions.length > 0 && (
        <>
          <div className="step-content">
            <label>Dialect:</label>
            <select
              value={formData.selectedDialect}
              onChange={(e) =>
                setFormData({ ...formData, selectedDialect: e.target.value })
              }
            >
              <option value="">Selecteer dialect</option>
              {dialectOptions.map((dialect, index) => (
                <option key={dialect.name} value={dialect.name}>
                  {dialect.name.charAt(0).toUpperCase() + dialect.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <>
        <label>
          Leeftijdsgroep{" "}
          <span style={{ color: "#fac215" }}> {ageValue.join(" , ")}:</span>
        </label>
        <div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[formData.ageGroup.min, formData.ageGroup.max]}
            max={100}
            min={0}
            renderThumb={(props, state) => (
              <div {...props} className="thumb">
                <span className="thumb-value">{state.valueNow}</span>
              </div>
            )}
            onChange={(values) =>
              setFormData({
                ...formData,
                ageGroup: { min: values[0], max: values[1] },
              })
            }
            onChange={handleAgeChange}
          />
        </div>
      </>
    </div>
  );
};

export default Step2;
