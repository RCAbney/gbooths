import useBoothStore from "../store/useBoothStore";
import Layout from "./Layout";
import BoothList from "./BoothList";
import Empty from "./Empty";
import getAllPublishers from "../utils/getAllPublishers";

type BoothContainerProps = {
  filterSelected?: boolean;
  showEmpty?: boolean;
};

const BoothContainer = ({ 
  filterSelected = false, 
  showEmpty = false 
}: BoothContainerProps) => {
  const allBooths = useBoothStore((state) => state.booths);
  const setIsBoothSelected = useBoothStore((state) => state.setIsBoothSelected);
  const setIsBoothVisited = useBoothStore((state) => state.setIsBoothVisited);

  const displayedBooths = filterSelected 
    ? allBooths.filter((booth) => booth.isSelected === true)
    : allBooths;

  const allPublishers = getAllPublishers(displayedBooths);

  const handleClick = (key: string) => {
    const index = allBooths.findIndex((e) => e.rowKey === key);
    if (index !== -1) {
      const title = allBooths[index].Title;
      setIsBoothSelected({ index, title });
    }
  };

  const handleVisitedClick = (key: string) => {
    const index = allBooths.findIndex((e) => e.rowKey === key);
    if (index !== -1) {
      setIsBoothVisited(index);
    }
  };

  if (showEmpty && displayedBooths.length === 0) {
    return (
      <Layout>
        <Empty />
      </Layout>
    );
  }

  return (
    <Layout>
      <BoothList
        allPublishers={allPublishers}
        allBooths={displayedBooths}
        handleClick={handleClick}
        handleVisitedClick={handleVisitedClick}
        filteredView={filterSelected}
      />
    </Layout>
  );
};

export default BoothContainer; 