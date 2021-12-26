import { env } from "../utils/env";
import { flag } from "../utils/flag";

const TAG_PREFIX = env("INPUT_TAG-PREFIX", "");
const COMMIT_MESSAGE = env(
    "INPUT_COMMIT-MESSAGE",
    "ci: version bump to {{version}}",
);
const COMMIT_MESSAGE_REGEX = new RegExp(
    COMMIT_MESSAGE.replace(/{{version}}/g, `${TAG_PREFIX}\\d+\\.\\d+\\.\\d+`),
    "ig",
);

export { TAG_PREFIX, COMMIT_MESSAGE, COMMIT_MESSAGE_REGEX };

const MAJOR_WORDING = env("INPUT_MAJOR-WORDING", "BREAKING CHANGES").split(",");
const MINOR_WORDING = env("INPUT_MINOR-WORDING", "feat").split(",");
const PATCH_WORDING = env("INPUT_PATCH-WORDING", "fix").split(",");

export { MAJOR_WORDING, MINOR_WORDING, PATCH_WORDING };

const SKIP_COMMIT = flag("INPUT_SKIP-COMMIT");
const SKIP_TAG = flag("INPUT_SKIP-TAG");
const SKIP_PUSH = flag("INPUT_SKIP-PUSH");
const SKIP_FOR_CANARY = flag("INPUT_SKIP-FOR-CANARY");

export { SKIP_COMMIT, SKIP_TAG, SKIP_PUSH, SKIP_FOR_CANARY };
