import { bumpPackageVersion } from "./bump-package-version";

bumpPackageVersion();

process.on("unhandledRejection", (reason, promise) => {
    console.error(`Error: ${reason} - ${promise}`);
    process.exit(1);
});
