import React, { useState } from "react";
import "../../styles/filterMobile.css";
import ReactSlider from "react-slider";

function FilterMobile({ setOpenFilter }) {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setelectedLanguages] = useState([]);
  const [ageValue, setAgeValue] = useState([0, 100]);
  const toggleQuestion = (index) => {
    setActiveIndexes((prevActiveIndexes) => {
      if (prevActiveIndexes.includes(index)) {
        return prevActiveIndexes.filter((item) => item !== index);
      } else {
        return [...prevActiveIndexes, index];
      }
    });
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
    } else {
      setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      );
    }
  };
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    if (event.target.checked) {
      setelectedLanguages((prevSelectedGenres) => [
        ...prevSelectedGenres,
        language,
      ]);
    } else {
      setelectedLanguages((prevSelectedGenres) =>
        prevSelectedGenres.filter((selectedGenre) => selectedGenre !== language)
      );
    }
  };
  const handleAgeChange = (value) => {
    setAgeValue(value);
  };

  return (
    <>
      <div className="filterMobile-container">
        <div className="filter-header">
          <span>
            <img
              src="../images/Icon-arrow-left.svg"
              onClick={() => setOpenFilter(false)}
            />
            <h2>Filter</h2>
          </span>
          <div>
            <a href="/">
              <h3>Resetten</h3>
            </a>
          </div>
        </div>
        <div className="filter-body">
          <div
            className={`filterItem ${
              activeIndexes.includes(0) ? "active" : ""
            }`}
          >
            <span className="arrow" onClick={() => toggleQuestion(0)}>
              <img src="../images/Icon-arrow-forward.svg" alt="" />
            </span>
            <h2>
              Genre <span> {selectedGenres.join(", ")}</span>
            </h2>
            <div
              className={`contents   ${
                activeIndexes.includes(0) ? "show" : ""
              }`}
            >
              <input
                type="checkbox"
                value="fantasie"
                onChange={handleGenreChange}
                id="fantasie"
              />
              <label htmlFor="fantasie">Fantasie</label>
              <br />
              <input
                type="checkbox"
                value="avontuur"
                onChange={handleGenreChange}
                id="avontuur"
              />
              <label htmlFor="avontuur">Avontuur</label>
              <br />
              <input
                type="checkbox"
                value="fictie"
                onChange={handleGenreChange}
                id="fictie"
              />
              <label htmlFor="fictie">Fictie</label>
              <br />
              <input
                type="checkbox"
                value="sprookje"
                onChange={handleGenreChange}
                id="sprookje"
              />
              <label htmlFor="sprookje">Sprookje</label>
              <br />
              <input
                type="checkbox"
                value="humor"
                onChange={handleGenreChange}
                id="humor"
              />
              <label htmlFor="humor">Humor</label>
              <br />
              <input
                type="checkbox"
                value="vriendschap"
                onChange={handleGenreChange}
                id="vriendschap"
              />
              <label htmlFor="vriendschap">Vriendschap</label>
              <br />
            </div>
          </div>
          <div
            className={`filterItem ${
              activeIndexes.includes(1) ? "active" : ""
            }`}
          >
            <span className="arrow" onClick={() => toggleQuestion(1)}>
              <img src="../images/Icon-arrow-forward.svg" alt="" />
            </span>
            <h2>
              Taal <span>{selectedLanguages.join(", ")}</span>
            </h2>
            <div
              className={`contents ${activeIndexes.includes(1) ? "show" : ""}`}
            >
              <input
                type="checkbox"
                value="Frans"
                onChange={handleLanguageChange}
                id="frans"
              />
              <label htmlFor="frans">Frans</label>
              <br />
              <input
                type="checkbox"
                value="Nederlands"
                onChange={handleLanguageChange}
                id="nederlands"
              />
              <label htmlFor="nederlands">Nederlands</label>
              <br />
              <input
                type="checkbox"
                value="Spaans"
                onChange={handleLanguageChange}
                id="spaans"
              />
              <label htmlFor="spaans">Spaans</label>
              <br />
              <input
                type="checkbox"
                value="Engels"
                onChange={handleLanguageChange}
                id="engels"
              />
              <label htmlFor="engels">Engels</label>
              <br />
              <input
                type="checkbox"
                value="Duits"
                onChange={handleLanguageChange}
                id="duits"
              />
              <label htmlFor="duits">Duits</label>
              <br />
              <input
                type="checkbox"
                value="Arabisch"
                onChange={handleLanguageChange}
                id="arabisch"
              />
              <label htmlFor="arabisch">Arabisch</label>
              <br />
            </div>
          </div>
          <div
            className={`filterItem ${
              activeIndexes.includes(2) ? "active" : ""
            }`}
          >
            <span className="arrow" onClick={() => toggleQuestion(2)}>
              <img src="../images/Icon-arrow-forward.svg" alt="" />
            </span>
            <h2>
              Leeftijd <span>{ageValue.join(" , ")}</span>{" "}
            </h2>
            <div
              className={`contents ${activeIndexes.includes(2) ? "show" : ""}`}
            >
              <ReactSlider
                className="filter-horizontal-slider"
                thumbClassName="filter-example-thumb"
                trackClassName="filter-example-track"
                defaultValue={[0, 100]}
                max={100}
                min={0}
                renderThumb={(props, state) => (
                  <div {...props} className="filter-thumb">
                    <span className="filter-thumb-value">{state.valueNow}</span>
                  </div>
                )}
                onChange={handleAgeChange}
              />
            </div>
          </div>
          <button type="submit" className="button btn-result">
            Toon resultaten
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterMobile;
