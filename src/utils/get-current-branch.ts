import { IS_PULL_REQUEST } from "../constants/github";

const getCurrentBranch = () => {
    if (IS_PULL_REQUEST) {
        return process.env.GITHUB_HEAD_REF;
    }

    return /refs\/[a-zA-Z]+\/(.*)/.exec(process.env.GITHUB_REF)[1];
};

export { getCurrentBranch };
