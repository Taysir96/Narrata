import "../../styles/searchForm.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import ReactSlider from "react-slider";

function SearchForm({ setOpenFilter }) {
  const [sliderAgeOpen, setSliderAgeOpen] = useState(false);

  const toggleSliderAgeOpen = () => {
    setSliderAgeOpen(!sliderAgeOpen);
  };
  const handelOpenFilter = () => {
    setOpenFilter(true);
  };
  return (
    <>
      <div className="searchForm-container">
        <div className="searchInput-container">
          <form>
            <input type="text" placeholder="Zoeken" />
            <button type="submit">
              <img src="../images/Icon-search.svg" />
            </button>
          </form>
        </div>
        <div className="filter-container">
          <img src="../images/Icon-filter.svg" onClick={handelOpenFilter} />
        </div>
        <div className="desktop-filter-container">
          <section>
            <div className="desktop-searchInput-container">
              <form>
                <input type="text" placeholder="Zoeken" />
                <button type="submit">
                  <img src="../images/Icon-search.svg" />
                </button>
              </form>
            </div>
            <div className="select-filter">
              <select id="genre-select">
                <option value="option1">Genre</option>
                <option value="option2">Optie 2</option>
                <option value="option3">Optie 3</option>
                <option value="option4">Optie 4</option>
              </select>

              <select id="taal-select">
                <option value="option1">Taal</option>
                <option value="option2">Optie 2</option>
                <option value="option3">Optie 3</option>
                <option value="option4">Optie 4</option>
              </select>

              <select id="dialect-select">
                <option value="option1">Dialect</option>
                <option value="option2">Optie 2</option>
                <option value="option3">Optie 3</option>
                <option value="option4">Optie 4</option>
              </select>
              <button className="age-select" onClick={toggleSliderAgeOpen}>
                Leeftijd
              </button>
              <a href="">
                <button className="button reset-btn">Reset</button>
              </a>
            </div>
          </section>
          <div
            className={`slider-age ${sliderAgeOpen ? "slider-age-open" : ""}`}
          >
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 100]}
              max={100}
              min={0}
              renderThumb={(props, state) => (
                <div {...props} className="thumb">
                  <span className="thumb-value">{state.valueNow}</span>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
