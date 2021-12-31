import { EMAIL, USER } from "constants/github";
import { exec } from "utils/exec";

const prepareGitActor = async () => {
    await exec(`git config user.name "${USER}"`);
    await exec(`git config user.email "${EMAIL}"`);
};

export { prepareGitActor };
