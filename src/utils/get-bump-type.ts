import { MAJOR_WORDING, MINOR_WORDING, PATCH_WORDING } from "../constants";
import { extractMessages } from "./extract-messages";
import { haveWords } from "./have-words";

import type { BumpType, Commit } from "../types";

const getBumpType = (commits: Commit[]): BumpType | null => {
    const messages = extractMessages(commits);

    switch (true) {
        case haveWords(messages, MAJOR_WORDING):
            return "major";
        case haveWords(messages, MINOR_WORDING):
            return "minor";
        case haveWords(messages, PATCH_WORDING):
            return "patch";
        default:
            return null;
    }
};

export { getBumpType };
