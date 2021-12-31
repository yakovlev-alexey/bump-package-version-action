import { getOctokit } from "@actions/github";

import {
    EVENT_PATH,
    IS_PULL_REQUEST,
    PULL_REQUEST_NUMBER,
    REPO,
} from "constants/github";

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
        pull_number: PULL_REQUEST_NUMBER!,
    });

    return data.map(({ commit }) => commit);
};

export { getCommits };
