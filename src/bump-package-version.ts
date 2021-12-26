import core from "@actions/core";
import { context } from "@actions/github";

import { haveVersionBump } from "./utils/have-version-bump";
import { getPackageJson } from "./utils/get-package-json";
import { getBumpType } from "./utils/get-bump-type";
import { getCommits } from "./utils/get-commits";

import { prepareGitActor } from "./steps/prepare-git-actor";
import { makeCheckout } from "./steps/make-checkout";
import { bumpVersion } from "./steps/bump-version";
import { makeCommit } from "./steps/make-commit";
import { makePush } from "./steps/make-push";
import { makeTag } from "./steps/make-tag";

export const bumpPackageVersion = async () => {
    console.log(context);
    const commits = await getCommits();

    if (commits.length === 0) {
        console.log("No commits found: aborting bump");
        return;
    }

    if (await haveVersionBump(commits)) {
        console.log("Previous bump found: aborting bump");
        return;
    }

    await prepareGitActor();

    const bumpType = getBumpType(commits);

    if (bumpType === null) {
        console.log("No wording matched: aborting bump");
        return;
    }

    await makeCheckout();

    const pkg = await getPackageJson();
    const current = pkg.version.toString();

    const version = await bumpVersion(bumpType);

    await makeCommit(version);
    await makeTag(version);
    await makePush();

    console.log(`Successfully bumped version from ${current} to ${version}`);

    core.setOutput("version", version);
};
