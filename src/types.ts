type Package = {
    version: string;
};

type Commit = {
    message: string;
    body: string;
    hash: string;
};

type BumpType = "major" | "minor" | "patch";

export type { Package, Commit, BumpType };
