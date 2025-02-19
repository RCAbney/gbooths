import { FC, memo } from "react";
import { Booth } from "../types/types";
import PublisherHeader from './PublisherHeader';
import BoothItem from './BoothItem';

type Publisher = {
  Publisher: string;
  Location: string;
};

type BoothListProps = {
  allBooths: Booth[];
  allPublishers: Publisher[];
  handleClick: (rowKey: string) => void;
  handleVisitedClick: (rowKey: string) => void;
  filteredView?: boolean;
};

const BoothList: FC<BoothListProps> = ({
  allPublishers,
  allBooths,
  handleClick,
  handleVisitedClick,
  filteredView = false,
}) => {
  return (
    <>
      {allPublishers.map((name, i) => {
        if (!name.Publisher) return null;
        
        const publisherBooths = allBooths
          .filter((booth) => booth.Publisher === name.Publisher)
          .sort((a, b) => a.Title.localeCompare(b.Title));

        // Memoize individual booth items
        const MemoizedBoothItem = memo(BoothItem);

        return (
          <div key={name.Publisher + i} className="bg-white shadow overflow-hidden">
            <PublisherHeader publisher={name.Publisher} location={name.Location} />
            <ul className="divide-y divide-gray-200 list-none pl-0">
              {publisherBooths.map((booth) => (
                <MemoizedBoothItem
                  key={booth.rowKey}
                  booth={booth}
                  filteredView={filteredView}
                  onVisitedClick={handleVisitedClick}
                  onClick={handleClick}
                  isSelected={booth.isSelected}
                  isVisited={booth.isVisited}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default BoothList;
