import type { Commit } from "../types";

const getRcVersion = (version: string, commits: Commit[]) => {
    const latestHash = commits[commits.length - 1].hash;

    return version.replace(/-rc-.*/, "") + `-rc-${latestHash}`;
};

export { getRcVersion };
