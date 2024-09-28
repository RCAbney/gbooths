import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { Booth } from "../types/types";

type BoothState = {
    booths: Booth[];
    sortedBy: string;
    setAllBooths: (payload: Booth[]) => void;
    setIsBoothSelected: (payload: { title: string; index: number }) => void;
    setIsBoothVisited: (payload: number) => void;
    setSortedBy: () => void;
};

const useBoothStore = create<BoothState>()(
    devtools(
        persist(
            (set, get) => ({
                booths: [],
                sortedBy: "Publisher",
                setAllBooths: (payload: Booth[]) =>
                    set(() => ({ booths: payload }), false, "setAllBooths"),
                setIsBoothSelected: (payload: {
                    title: string;
                    index: number;
                }) => {
                    const booths = get().booths;
                    let updatedBooths = [...booths];
                    if (booths[payload.index].isSelected) {
                        updatedBooths[payload.index].isSelected = false;
                        set(
                            () => ({ booths: updatedBooths }),
                            false,
                            "setIsBoothSelected"
                        );
                        toast.success(
                            `${payload.title} was removed from your booths.`
                        );
                    } else {
                        updatedBooths[payload.index].isSelected = true;
                        set(
                            () => ({ booths: updatedBooths }),
                            false,
                            "setIsBoothSelected"
                        );
                        toast.success(
                            `${payload.title} was added to your booths.`
                        );
                    }
                },
                setIsBoothVisited: (payload: number) => {
                    console.log("eyeblick");
                    const booths = get().booths;
                    let updatedBooths = [...booths];
                    if (booths[payload].isVisited) {
                        updatedBooths[payload].isVisited = false;
                        set(
                            () => ({ booths: updatedBooths }),
                            false,
                            "setIsBoothVisisted"
                        );
                    } else {
                        updatedBooths[payload].isVisited = true;
                        set(
                            () => ({ booths: updatedBooths }),
                            false,
                            "setIsBoothVisited"
                        );
                    }
                },
                setSortedBy: () => {
                    const sortedBy = get().sortedBy;
                    const booths = get().booths;
                    let newSort = [...booths];
                    if (sortedBy === "Location") {
                        newSort.sort((a: Booth, b: Booth) => {
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
                        set(() => {
                            return {
                                booths: newSort,
                                sortedBy: "Publisher",
                            };
                        });
                    } else if (sortedBy === "Publisher") {
                        newSort.sort((a, b) => {
                            const locA = a.rowLocationNum;
                            const locB = b.rowLocationNum;
                            if (!locA || !locB) return 0;
                            if (locA < locB) {
                                return -1;
                            }
                            if (locA > locB) {
                                return 1;
                            }
                            return 0;
                        });
                        set(() => {
                            return {
                                booths: newSort,
                                sortedBy: "Location",
                            };
                        });
                    }
                },
            }),
            { name: "booth-store" }
        )
    )
);

export default useBoothStore;
