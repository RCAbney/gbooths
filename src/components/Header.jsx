import React from "react";
import { Link } from "react-router-dom";
import d20 from "../img/d20.png";
import useBoothStore from "../store/useBoothStore";

const Header = () => {
  const sorted = useBoothStore((state) => state.sortedBy);
  const setSortedBy = useBoothStore((state) => state.setSortedBy);

  return (
    <div className="sticky top-0">
      <div className="flex items-center justify-between bg-black p-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold leading-7 text-white sm:truncate">
            <Link to="/" className="flex gap-3">
              <img
                src={d20}
                alt="GBooths app"
                width="30"
                height="30"
                style={{ filter: "brightness(0) invert(1)" }}
              />{" "}
              GBooths
            </Link>
          </h2>
        </div>
        <div className="flex md:mt-0 md:ml-4 gap-4">
          <Link
            to="/all-booths"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            View All
          </Link>
          <Link
            to="/my-booths"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            My Booths
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between bg-blue-700 p-2 px-4">
        <p className="text-white">Sorted by:</p>
        <button
          className="bg-gray-500 px-4 py-2 text-white rounded-md"
          onClick={() => setSortedBy()}
        >
          {sorted}
        </button>
      </div>
    </div>
  );
};

export default Header;
