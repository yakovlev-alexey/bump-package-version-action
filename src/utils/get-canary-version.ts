import { exec } from "./exec";

const getCanaryVersion = async (version: string) => {
    const latestHash = await exec("git rev-parse --short HEAD");

    return version.replace(/-canary-.*/, "") + `-canary-${latestHash}`;
};

export { getCanaryVersion };
