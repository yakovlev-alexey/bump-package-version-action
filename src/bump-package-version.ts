import { haveVersionBump } from "./utils/have-version-bump";
import { getPackageJson } from "./utils/get-package-json";
import { getCommits } from "./utils/get-commits";

import { calculateVersion } from "./steps/calculate-version";
import { prepareGitActor } from "./steps/prepare-git-actor";
import { bumpVersion } from "./steps/bump-version";
import { makeCommit } from "./steps/make-commit";
import { makePush } from "./steps/make-push";
import { makeTag } from "./steps/make-tag";
import { IS_PULL_REQUEST } from "./constants";

export const bumpPackageVersion = async () => {
    const commits = await getCommits();

    if (!IS_PULL_REQUEST && commits.length === 0) {
        console.log("No commits found: aborting bump");
        return;
    }

    if (await haveVersionBump(commits)) {
        console.log("Previous bump found: aborting bump");
        return;
    }

    await prepareGitActor();

    const pkg = await getPackageJson();

    const current = pkg.version.toString();

    const calculatedVersion = await calculateVersion(current, commits);

    if (calculatedVersion === null) {
        console.log("No wording matched: aborting bump");
        return;
    }

    const version = await bumpVersion(calculatedVersion);

    await makeCommit(version);
    await makeTag(version);
    await makePush();

    console.log(`Successfully bumped version from ${current} to ${version}`);
};
