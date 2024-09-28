import { Booth } from "../types/types";

export default function getAllPublishers(
    booths: Booth[]
): { Publisher: string; Location: string }[] {
    return [
        ...new Set(
            booths
                .map((booth) =>
                    JSON.stringify({
                        Publisher: booth.Publisher,
                        Location: booth.Location,
                    })
                )
                .flat()
        ),
    ].map((item) => JSON.parse(item));
}
