import { exec } from "utils/exec";

const makeTag = async (version: string) => {
    await exec(`git tag ${version}`);
};

export { makeTag };
