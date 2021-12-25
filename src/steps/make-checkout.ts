import { getCurrentBranch } from "../utils/get-current-branch";
import { exec } from "../utils/exec";

const makeCheckout = async () => {
    const branch = getCurrentBranch();

    await exec(`git checkout ${branch}`);
};

export { makeCheckout };
