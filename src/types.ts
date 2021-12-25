type Package = {
    version: string;
};

type Commit = {
    message: string;
    body: string;
    id: string;
};

type BumpType = "major" | "minor" | "patch";

export type { Package, Commit, BumpType };
