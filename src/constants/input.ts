import { env } from "../utils/env";

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
