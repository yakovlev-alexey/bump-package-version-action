import type { Commit } from "../types";

const extractMessages = (commits: Commit[]) => {
    return commits.map((commit) => commit.message);
};

export { extractMessages };
