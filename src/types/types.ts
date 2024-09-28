type MouseEvent = React.MouseEvent<HTMLButtonElement>;

type Booth = {
    Title: string;
    index: number;
    Publisher: string;
    rowLocationNum: number | null;
    isVisited: boolean;
    isSelected: boolean;
    Location: string | number;
    BGGId: number;
    rowKey: string;
    Availability: string;
    MSRP: number | string;
}

export type { MouseEvent, Booth };