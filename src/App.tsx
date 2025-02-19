import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useBoothStore from "./store/useBoothStore";
import AllBooths from "./routes/AllBooths";
import MyBooths from "./routes/MyBooths";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { Booth } from "./types/types";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const setAllBooths = useBoothStore((state) => state.setAllBooths);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["booths"],
        queryFn: async (): Promise<Booth[]> => {
            const res = await fetch("/data/gencon-2024.json");
            if (!res.ok) {
                throw new Error('Failed to fetch booths');
            }
            const data: Booth[] = await res.json();
            
            const processedBooths = data.map((row, index) => ({
                ...row,
                Location: typeof row.Location === "number" 
                    ? row.Location.toString() 
                    : row.Location,
                rowKey: `${row.BGGId ? row.BGGId : "NoBGGId"}-${index}`,
                rowLocationNum: typeof row.Location === "string"
                    ? parseInt(row.Location.replace(/\D/g, ""))
                    : row.Location || 0,
            })).sort((a, b) => {
                const pubA = a.Publisher?.toUpperCase() || "";
                const pubB = b.Publisher?.toUpperCase() || "";
                return pubA.localeCompare(pubB);
            });
            
            setAllBooths(processedBooths);
            return processedBooths;
        },
        // Prevent refetching on window focus since data is unlikely to change
        refetchOnWindowFocus: false,
        // Cache the data for 1 hour
        staleTime: 1000 * 60 * 60,
    });

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return (
            <ErrorState 
                message={error instanceof Error ? error.message : 'An error occurred'} 
            />
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<AllBooths />} />
                <Route path="/my-booths" element={<MyBooths />} />
            </Routes>
            <ToastContainer position="top-center" autoClose={750} />
        </>
    );
};

export default App;
