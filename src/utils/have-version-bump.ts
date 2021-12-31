import { COMMIT_MESSAGE_REGEX } from "constants/input";
import { extractMessages } from "./extract-messages";

import type { Commit } from "../types";

const haveVersionBump = async (commits: Commit[]) => {
    const messages = extractMessages(commits);

    return messages.some((message) => COMMIT_MESSAGE_REGEX.test(message));
};

export { haveVersionBump };
