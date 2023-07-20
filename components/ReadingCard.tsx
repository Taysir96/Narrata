import React from "react";
import Link from "next/link";
import "../styles/ThumbnailVideos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ReadingCard = ({
  reading,
  username,
}: {
  reading: any;
  username: string;
}) => {
  return (
    <div className="Thumbnail-picture relative">
      <div className="absolute  left-0 bg-blue-900 bg-opacity-90 text-white pl-2 pr-2  rounded-tl-md rounded-br-md">
        {reading?.views}
        <FontAwesomeIcon icon={faEye} className="ml-2" />{" "}
      </div>
      <div className="absolute  right-0  bg-blue-900  bg-opacity-90  text-white pl-2 pr-2  rounded-bl-md rounded-tr-md capitalize">
        {reading?.language}
        {reading?.selectedDialect && (
          <>
            {" "}
            -{" "}
            <span className="text-yellow-500">{reading?.selectedDialect}</span>
          </>
        )}
      </div>
      <Link href={`/reading/${reading?.id}`}>
        <img
          src={reading?.thumbnailUrl}
          alt={reading.title}
          className="rounded-lg"
          loading="lazy"
        />
      </Link>
      <h3>{reading?.title}</h3>
      <p>{username}</p>
    </div>
  );
};

export default ReadingCard;
