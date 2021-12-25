import { COMMIT_MESSAGE_REGEX } from "../constants";
import { extractMessages } from "./extract-messages";

import type { Commit } from "../types";

const haveVersionBump = async (commits: Commit[]) => {
    const messages = extractMessages(commits);

    console.log(COMMIT_MESSAGE_REGEX, messages);
    return messages.some((message) => COMMIT_MESSAGE_REGEX.test(message));
};

export { haveVersionBump };
