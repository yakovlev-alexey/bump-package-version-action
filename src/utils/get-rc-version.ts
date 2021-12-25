import type { Commit } from "../types";

const getRcVersion = (version: string, commits: Commit[]) => {
    console.log("rc version", version, commits);
    const latestHash = commits[commits.length - 1].id;

    return version.replace(/-rc-.*/, "") + `-rc-${latestHash}`;
};

export { getRcVersion };
