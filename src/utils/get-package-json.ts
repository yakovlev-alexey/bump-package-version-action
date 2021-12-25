import { promises as fs, constants } from "fs";
import path from "path";

import { WORKSPACE } from "../constants";

import type { Package } from "../types";

const fsExists = async (filePath: string): Promise<boolean> =>
    fs.access(filePath, constants.F_OK).then(
        () => true,
        () => false,
    );

const getPackageJson = async (): Promise<Package> => {
    const pathToPackage = path.join(WORKSPACE, "package.json");

    if (!fsExists(pathToPackage)) {
        throw new Error(
            "package.json could not be found in your project's root",
        );
    }

    return import(pathToPackage);
};

export { getPackageJson };
