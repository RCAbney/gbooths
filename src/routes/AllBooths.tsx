import React from "react";
import useBoothStore from "../store/useBoothStore";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";
import getAllPublishers from "../utils/getAllPublishers";

const AllBooths = () => {
  const allBooths = useBoothStore((state) => state.booths);
  const setIsBoothSelected = useBoothStore((state) => state.setIsBoothSelected);
  const setIsBoothVisited = useBoothStore((state) => state.setIsBoothVisited);

  const handleClick = (key: string) => {
    const index = allBooths.map((e) => e.rowKey).indexOf(key);
    const title = allBooths[index].Title;
    const payload = {
      index: index,
      title: title,
    };
    setIsBoothSelected(payload);
  };
  const handleVisitedClick = (key: string) => {
    const index = allBooths.map((e) => e.rowKey).indexOf(key);
    setIsBoothVisited(index);
  };

  const allPublishers = getAllPublishers(allBooths);

  return (
    <Layout>
      <BoothList
        allPublishers={allPublishers}
        allBooths={allBooths}
        handleClick={handleClick}
        handleVisitedClick={handleVisitedClick}
      />
    </Layout>
  );
};

export default AllBooths;
