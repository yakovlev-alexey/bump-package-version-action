import { EVENT_PATH } from "../constants";

import type { Commit } from "../types";

const getCommits = async (): Promise<Commit[]> => {
    return EVENT_PATH ? (await import(EVENT_PATH)).commits : [];
};

export { getCommits };
