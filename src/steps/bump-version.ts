import { getCanaryVersion } from "../utils/get-canary-version";
import { exec } from "../utils/exec";

import { IS_PULL_REQUEST } from "../constants/github";

import type { BumpType } from "../types";

const bumpVersion = async (type: BumpType) => {
    const version = (
        await exec(`npm version --git-tag-version=false ${type}`)
    ).trim();

    if (!IS_PULL_REQUEST) {
        return version;
    }

    const canaryVersion = await getCanaryVersion(version);

    return await exec(`npm version --git-tag-version=false ${canaryVersion}`);
};

export { bumpVersion };
