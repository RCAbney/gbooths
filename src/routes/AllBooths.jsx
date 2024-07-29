import React from "react";
import useBoothStore from "../store/useBoothStore";
import Layout from "../components/Layout";
import BoothList from "../components/BoothList";

const AllBooths = () => {
  const allBooths = useBoothStore((state) => state.booths);
  const setIsBoothSelected = useBoothStore((state) => state.setIsBoothSelected);
  const setIsBoothVisited = useBoothStore((state) => state.setIsBoothVisited);

  const handleClick = (key) => {
    const index = allBooths.map((e) => e.rowKey).indexOf(key);
    const title = allBooths[index].Title;
    const payload = {
      index: index,
      title: title,
    };
    setIsBoothSelected(payload);
  };
  const handleVisitedClick = (key) => {
    const index = allBooths.map((e) => e.rowKey).indexOf(key);
    setIsBoothVisited(index);
  };

  const allPublishers = [
    ...new Set(
      allBooths
        .map((booth) =>
          JSON.stringify({
            Publisher: booth.Publisher,
            Location: booth.Location,
          })
        )
        .flat()
    ),
  ].map(JSON.parse);

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
