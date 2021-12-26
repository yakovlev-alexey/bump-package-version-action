import { getOctokit } from "@actions/github";

import { getPullRequestNumber } from "./get-pull-request-number";
import { EVENT_PATH, IS_PULL_REQUEST, REPO } from "../constants";

import type { Commit } from "../types";

const getCommits = async (): Promise<Commit[]> => {
    const eventCommits = EVENT_PATH && (await require(EVENT_PATH)).commits;

    if (!IS_PULL_REQUEST) {
        return eventCommits || [];
    }

    const { data } = await getOctokit(
        process.env.GITHUB_TOKEN,
    ).rest.pulls.listCommits({
        repo: REPO.split("/")[1],
        owner: process.env.GITHUB_REPOSITORY_OWNER,
        // pretty sure it's a pull request
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pull_number: getPullRequestNumber()!,
    });

    return data.map(({ commit }) => commit);
};

export { getCommits };
