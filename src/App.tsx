import React, { useEffect } from "react";
import useBoothStore from "./store/useBoothStore";
import AllBooths from "./routes/AllBooths";
import MyBooths from "./routes/MyBooths";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Booth } from "./types/types";

function App() {
    const allBooths = useBoothStore((state) => state.booths);
    const setAllBooths = useBoothStore((state) => state.setAllBooths);

    const fetchAllBooths = async () => {
        const res = await fetch("/data/gencon-2024.json");
        return res.json();
    };

    const getBoothsQuery = useQuery({
        queryKey: ["allBooths"],
        queryFn: fetchAllBooths,
    });

    const { data, isError, isLoading } = getBoothsQuery;

    useEffect(() => {
        if (data && allBooths.length === 0) {
            const keyed = data.map((row: Booth, index: number) => {
                if (typeof row.Location === "number") {
                    row.Location = row.Location.toString();
                }
                return {
                    ...row,
                    rowKey: `${row.BGGId ? row.BGGId : "NoBGGId"}-${index}`,
                    rowLocationNum: row.Location
                        ? parseInt(row.Location.replace(/\D/g, ""))
                        : 0,
                };
            }).sort((a: Booth, b: Booth) => {
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
            setAllBooths(keyed);
        }
    }, [allBooths.length, data]);

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
