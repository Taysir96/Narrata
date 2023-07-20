import { useState } from "react";
import "../../styles/ThumbnailVideos.css";
import Link from "next/link";

const videoSources = [
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
  "../images/thumbnail.png",
];

function ThumbnailVideos() {
  const [usefilter, setUsefilter] = useState(false);
  const topNumber = 10;
  return (
    <>
      {usefilter ? (
        <div className="ThumbnailVideos-container-zoekresultaat">
          <h2>zoekresultaat</h2>
          <div className="ThumbnailVideos-picture-zoekresultaat">
            {videoSources.map((filename, index) => (
              <div className="Thumbnail-picture-zoekresultaat" key={index}>
                <Link href={filename} target="_blank">
                  <img src={filename} />
                </Link>
                <h3>Het leven van een loser</h3>
                <p>Voorlezer: Cedric Vannerum</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="ThumbnailVideos-container">
          <h2>Populair</h2>
          <div className="ThumbnailVideos-picture">
            {videoSources.map((filename, index) => (
              <div className="Thumbnail-picture" key={index}>
                <Link href={filename} target="_blank">
                  <img src={filename} />
                </Link>
                <h3>Het leven van een loser</h3>
                <p>Voorlezer: Cedric Vannerum</p>
              </div>
            ))}
          </div>
          <h2>Laatst Bekeken</h2>
          <div className="ThumbnailVideos-picture">
            {videoSources.map((filename, index) => (
              <div className="Thumbnail-picture" key={index}>
                <Link href={filename} target="_blank">
                  <img src={filename} />
                </Link>
                <h3>Het leven van een loser</h3>
                <p>Voorlezer: Cedric Vannerum</p>
              </div>
            ))}
          </div>

          <h2>Top 10 voor jou</h2>
          <div className="ThumbnailVideos-picture">
            {videoSources.slice(0, topNumber).map((filename, index) => (
              <div className="Thumbnail-picture" key={index}>
                <section>
                  <span className="top10-number">
                    <p>{index + 1}</p>
                  </span>
                  <Link href={filename} target="_blank">
                    <img src={filename} />
                  </Link>
                </section>
                {/* <h3>Het leven van een loser</h3>
                <p>Voorlezer: Cedric Vannerum</p>  te doen*/}
              </div>
            ))}
          </div>
          <h2>Random Genre</h2>
          <div className="ThumbnailVideos-picture">
            {videoSources.map((filename, index) => (
              <div className="Thumbnail-picture" key={index}>
                <Link href={filename} target="_blank">
                  <img src={filename} />
                </Link>
                <h3>Het leven van een loser</h3>
                <p>Voorlezer: Cedric Vannerum</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ThumbnailVideos;
