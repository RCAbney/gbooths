import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { MinusIcon as MinusIconOutline } from "@heroicons/react/24/outline";
import { EyeIcon as EyeIconOutline } from "@heroicons/react/24/outline";
import { EyeSlashIcon as EyeOffIconOutline } from "@heroicons/react/24/outline";
import { Booth } from "../types/types";
import { BUTTON_BASE_STYLES, COLOR_VARIANTS } from '../constants/styles';

type BoothItemProps = {
  booth: Booth;
  filteredView: boolean;
  onVisitedClick: (rowKey: string) => void;
  onClick: (rowKey: string) => void;
  isSelected: boolean;
  isVisited: boolean;
};

export const BoothItem = ({ 
  booth, 
  filteredView, 
  onVisitedClick, 
  onClick, 
  isSelected, 
  isVisited 
}: BoothItemProps) => {
  const selected = isSelected
    ? COLOR_VARIANTS.selected.active
    : COLOR_VARIANTS.selected.inactive;
  const visited = isVisited
    ? COLOR_VARIANTS.visited.active
    : COLOR_VARIANTS.visited.inactive;

  return (
    <li
      className={
        filteredView
          ? isVisited
            ? "pl-0 bg-gray-200"
            : "pl-0"
          : isSelected || isVisited
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
                {isVisited ? " visited" : ""}
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
              className={`${BUTTON_BASE_STYLES} ${visited}`}
              onClick={() => onVisitedClick(booth.rowKey)}
            >
              {isVisited ? (
                <EyeOffIconOutline className="h-6 w-6" aria-hidden="true" />
              ) : (
                <EyeIconOutline className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {filteredView ? (
              <button
                className={`ml-2 ${BUTTON_BASE_STYLES} ${COLOR_VARIANTS.selected.active}`}
                onClick={() => onClick(booth.rowKey)}
              >
                <MinusIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
            ) : (
              <button
                className={`ml-2 ${BUTTON_BASE_STYLES} ${selected}`}
                onClick={() => onClick(booth.rowKey)}
              >
                {isSelected ? (
                  <MinusIconOutline className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default BoothItem; 