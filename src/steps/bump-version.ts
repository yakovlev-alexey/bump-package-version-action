import { exec } from "../utils/exec";

const bumpVersion = async (version: string) => {
    return await exec(`npm version --git-tag-version=false ${version}`);
};

export { bumpVersion };
