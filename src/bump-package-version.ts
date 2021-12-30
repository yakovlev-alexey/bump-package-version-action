import { setOutput } from "@actions/core";

import { isForkPullRequest } from "./utils/is-fork-pull-request";
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

import {
    ABORT_FOR_FORKS,
    SKIP_COMMIT,
    SKIP_FOR_CANARY,
    SKIP_PUSH,
    SKIP_TAG,
} from "./constants/input";
import { IS_PULL_REQUEST } from "./constants/github";

export const bumpPackageVersion = async () => {
    if (ABORT_FOR_FORKS && isForkPullRequest()) {
        console.log("Running in a PR from a fork: aborting bump");
        setOutput("version", null);
        return;
    }

    const commits = await getCommits();

    if (commits.length === 0) {
        console.log("No commits found: aborting bump");
        setOutput("version", null);
        return;
    }

    if (await haveVersionBump(commits)) {
        console.log("Previous bump found: aborting bump");
        setOutput("version", null);
        return;
    }

    await prepareGitActor();

    const bumpType = getBumpType(commits);

    if (bumpType === null) {
        console.log("No wording matched: aborting bump");
        setOutput("version", null);
        return;
    }

    await makeCheckout();

    const pkg = await getPackageJson();
    const current = pkg.version.toString();

    const version = await bumpVersion(bumpType);

    if (!IS_PULL_REQUEST || (IS_PULL_REQUEST && !SKIP_FOR_CANARY)) {
        !SKIP_COMMIT && (await makeCommit(version));
        !SKIP_TAG && (await makeTag(version));
        !SKIP_PUSH && (await makePush());
    }

    console.log(`Successfully bumped version from ${current} to ${version}`);

    setOutput("version", version);
};
