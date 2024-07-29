import React, { useEffect } from "react";
import Papa from "papaparse";
import useBoothStore from "./store/useBoothStore";
import AllBooths from "./routes/AllBooths";
import MyBooths from "./routes/MyBooths";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';

function App() {
    const allBooths = useBoothStore((state) => state.booths);
    const setAllBooths = useBoothStore((state) => state.setAllBooths);

    useEffect(() => {
        if (allBooths.length === 0) {
            async function getData() {
                const response = await fetch("/data/gencon-2024.csv", {
                    method: "get",
                    headers: {
                        "content-type": "text/csv;charset=UTF-8",
                    },
                });
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder("utf-8");
                const csv = decoder.decode(result.value);
                const results = Papa.parse(csv, { header: true });
                const rows = results.data;
                const keyed = rows.map((row, index) => ({
                    ...row,
                    rowKey: `${row.BGGId ? row.BGGId : "NoBGGId"}-${index}`,
                    rowLocationNum: row.Location
                    ? parseInt(row.Location.replace(/\D/g, ""))
                        : 0,
                }));
                const sorted = keyed.sort((a, b) => {
                    const pubA = a.Publisher?.toUpperCase() || "";
                    const pubB = b.Publisher?.toUpperCase() || "";
                    if (pubA < pubB) {
                        return -1;
                    }
                    if (pubA > pubB) {
                        return 1;
                    }
                    return 0;
                });
                setAllBooths(sorted);
            }
            getData();
        }
    }, [allBooths.length]);

    return (
        <div className="app">
            <ToastContainer autoClose={750} position="top-center" />
            <Routes>
              <Route path="/my-booths" element={<MyBooths />} />
              <Route path="/all-booths" element={<AllBooths />} />
              <Route path="/" element={<MyBooths />} />
            </Routes>
        </div>
    );
}

export default App;
