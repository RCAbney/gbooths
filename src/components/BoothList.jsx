import React from "react";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { MinusIcon as MinusIconOutline } from "@heroicons/react/24/outline";
import { EyeIcon as EyeIconOutline } from "@heroicons/react/24/outline";
import { EyeSlashIcon as EyeOffIconOutline } from "@heroicons/react/24/outline";

const BoothList = ({
  allPublishers,
  allBooths,
  handleClick,
  handleVisitedClick,
  filteredView = false,
}) => {
  return (
    <>
      {allPublishers.map((name, i) => {
        if (!name.Publisher) return false;
        return (
          <div
            key={name.Publisher + i}
            className="bg-white shadow overflow-hidden"
          >
            <div className="bg-black py-2">
              <p className="text-xl text-white px-4 sm:px-6 my-0 font-bold">
                {name.Publisher} {name.Location && `- Booth #${name.Location}`}
              </p>
            </div>
            <ul className="divide-y divide-gray-200 list-none pl-0">
              {allBooths
                .filter((booth) => booth.Publisher === name.Publisher)
                .sort((a, b) => {
                  const titleA = a.Title;
                  const titleB = b.Title;
                  if (titleA < titleB) {
                    return -1;
                  }
                  if (titleA > titleB) {
                    return 1;
                  }
                  return 0;
                })
                .map((booth) => {
                  const selected = booth.isSelected
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
                  const visited = booth.isVisited
                    ? "bg-sky-700 hover:bg-sky-800 focus:ring-sky-600"
                    : "bg-sky-500 hover:bg-sky-600 focus:ring-sky-400";
                  return (
                    <li
                      key={booth.rowKey}
                      className={
                        filteredView
                          ? booth.isVisited
                            ? "pl-0 bg-gray-200"
                            : "pl-0"
                          : booth.isSelected || booth.isVisited
                          ? "pl-0 bg-gray-200"
                          : "pl-0"
                      }
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="max-w-[70%]">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              <a
                                href={`https://boardgamegeek.com/boardgame/${booth.BGGId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {booth.Title}
                              </a>
                              <span className="text-xs text-gray-500 font-light">
                                {booth.isVisited ? " visited" : ""}
                              </span>
                            </p>
                            <p className="flex items-center text-sm text-gray-500">
                              {booth.Availability}{" "}
                              {booth.Availability === `For Sale` &&
                                booth.MSRP !== `N/A` &&
                                ` - $${booth.MSRP}`}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <button
                              className={`inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${visited}`}
                              onClick={() => handleVisitedClick(booth.rowKey)}
                            >
                              {booth.isVisited ? (
                                <EyeOffIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EyeIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            {filteredView ? (
                              <button
                                className="ml-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => handleClick(booth.rowKey)}
                              >
                                <MinusIconOutline
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            ) : (
                              <button
                                className={`ml-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${selected}`}
                                onClick={() => handleClick(booth.rowKey)}
                              >
                                {booth.isSelected ? (
                                  <MinusIconOutline
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIconOutline
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default BoothList;
