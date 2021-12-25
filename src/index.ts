import pc from "picocolors";

import { bumpPackageVersion } from "./bump-package-version";

bumpPackageVersion();

process.on("unhandledRejection", (reason) => {
    console.error(pc.red(`Error: ${reason}`));
    process.exit(1);
});
