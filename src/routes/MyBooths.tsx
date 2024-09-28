import React from "react";
import useBoothStore from "../store/useBoothStore";
import Empty from "../components/Empty";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";
import getAllPublishers from "../utils/getAllPublishers";

const MyBooths = () => {
  const allBooths = useBoothStore((state) => state.booths);
  const setIsBoothSelected = useBoothStore((state) => state.setIsBoothSelected);
  const setIsBoothVisited = useBoothStore((state) => state.setIsBoothVisited);

  const filteredBooths = allBooths.filter((booth) => {
    return booth.isSelected === true;
  });

  const allPublishers = getAllPublishers(filteredBooths)

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

  return (
    <Layout>
      {filteredBooths.length > 0 ? (
        <BoothList
          allPublishers={allPublishers}
          allBooths={filteredBooths}
          handleClick={handleClick}
          handleVisitedClick={handleVisitedClick}
          filteredView
        />
      ) : (
        <Empty />
      )}
    </Layout>
  );
};

export default MyBooths;
