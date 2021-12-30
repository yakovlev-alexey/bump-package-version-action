import { context } from "@actions/github";

const isForkPullRequest = () => {
    const pr = context.payload.pull_request;

    if (!pr) {
        return false;
    }

    return pr.head.repo.full_name !== pr.base.repo.full_name;
};

export { isForkPullRequest };
