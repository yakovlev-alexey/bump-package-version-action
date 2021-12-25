import { REMOTE_REPO } from "../constants";
import { exec } from "../utils/exec";

const makePush = async () => {
    await exec(`git push ${REMOTE_REPO}`);
    await exec(`git push ${REMOTE_REPO} --tags`);
};

export { makePush };
