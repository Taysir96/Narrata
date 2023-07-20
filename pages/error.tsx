import React from "react";
import Link from "next/link";

const error = () => {
  return (
    <>
      {" "}
      <div className="">
        <div>
          Oeps... er is iets fout gegaan. Ga terug naar het startscherm.
        </div>
        <Link href={"/"}>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4">
            Terug naar startscherm
          </button>
        </Link>
      </div>
    </>
  );
};

export default error;
