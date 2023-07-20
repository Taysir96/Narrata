import React from "react";
import ReadersSliderHome from "./Home/ReadersSliderHome";
import SearchForm from "./Home/SearchForm";
import ThumbnailVideos from "./Home/ThumbnailVideos";
import FilterMobile from "./Home/FilterMobile";
import { useState } from "react";

function Home() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <>
      {openFilter ? (
        // <div onClick={() => setOpenFilter(false)}>test</div>
        <FilterMobile setOpenFilter={setOpenFilter} />
      ) : (
        <>
          <SearchForm setOpenFilter={setOpenFilter} />
          <ReadersSliderHome />
          <ThumbnailVideos />
        </>
      )}

      <br />
    </>
  );
}

export default Home;
