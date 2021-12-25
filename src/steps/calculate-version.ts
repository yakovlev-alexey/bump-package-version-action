import { getRcVersion } from "../utils/get-rc-version";
import { getBumpType } from "../utils/get-bump-type";
import { IS_PULL_REQUEST } from "../constants";

import type { Commit } from "../types";

const calculateVersion = (current: string, commits: Commit[]) => {
    if (IS_PULL_REQUEST) {
        return getRcVersion(current, commits);
    } else {
        return getBumpType(commits);
    }
};

export { calculateVersion };
