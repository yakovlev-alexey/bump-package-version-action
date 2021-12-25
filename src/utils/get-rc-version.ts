import { exec } from "./exec";

const getRcVersion = async (version: string) => {
    const latestHash = await exec("git rev-parse --short HEAD");

    return version.replace(/-rc-.*/, "") + `-rc-${latestHash}`;
};

export { getRcVersion };
