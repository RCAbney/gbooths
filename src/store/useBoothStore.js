import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-toastify";

const boothStore = (set, get) => ({
    booths: [],
    sortedBy: "Publisher",
    setAllBooths: (payload) => set(() => ({ booths: payload }), false, 'setAllBooths'),
    setIsBoothSelected: (payload) => {
        const booths = get().booths;
        let updatedBooths = [...booths];
        if (booths[payload.index].isSelected) {
            updatedBooths[payload.index].isSelected = false;
            set(() => ({ booths: updatedBooths }), false, 'setIsBoothSelected');
            toast.success(`${payload.title} was removed from your booths.`);
        } else {
            updatedBooths[payload.index].isSelected = true;
            set((state) => ({ booths: updatedBooths }), false, 'setIsBoothSelected');
            toast.success(`${payload.title} was added to your booths.`);
        }
    },
    setIsBoothVisited: (payload) => {
        console.log("eyeblick");
        const booths = get().booths;
        let updatedBooths = [...booths];
        if (booths[payload].isVisited) {
            updatedBooths[payload].isVisited = false;
            set(() => ({ booths: updatedBooths }), false, 'setIsBoothVisisted');
        } else {
            updatedBooths[payload].isVisited = true;
            set((state) => ({ booths: updatedBooths }), false, 'setIsBoothVisited');
        }
    },
    setSortedBy: () =>
        set((state) => {
            if (state.sortedBy === "Location") {
                let newSort = [...state.booths];
                newSort.sort((a, b) => {
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
                return {
                    booths: newSort,
                    sortedBy: "Publisher",
                };
            } else if (state.sortedBy === "Publisher") {
                let newSort = [...state.booths];
                newSort.sort((a, b) => {
                    const locA = a.rowLocationNum;
                    const locB = b.rowLocationNum;
                    if (locA < locB) {
                        return -1;
                    }
                    if (locA > locB) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    booths: newSort,
                    sortedBy: "Location",
                };
            }
        }, false, 'setSortedBy'),
});

const useBoothStore = create(
    devtools(
        persist(boothStore, { name: "booth-store" })
    )
);

export default useBoothStore;
