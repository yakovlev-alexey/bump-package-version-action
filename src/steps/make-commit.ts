import { COMMIT_MESSAGE } from "constants/input";
import { exec } from "utils/exec";

const makeCommit = async (version: string) => {
    const commitMessage = COMMIT_MESSAGE.replace(/{{version}}/g, version);

    await exec(`git commit -a -m "${commitMessage}"`);
};

export { makeCommit };
