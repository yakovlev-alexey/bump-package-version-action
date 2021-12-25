import { env } from "./utils/env";

const EVENT_PATH = env("GITHUB_EVENT_PATH");
const WORKSPACE = env("GITHUB_WORKSPACE");
const IS_PULL_REQUEST = Boolean(env("GITHUB_HEAD_REF"));
const REMOTE_REPO = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
const USER = env("GUTHUB_USER", "Automated Version Bump");
const EMAIL = env(
    "GUTHUB_EMAIL",
    "bump-package-version-action@users.noreply.github.com",
);

export { EVENT_PATH, WORKSPACE, IS_PULL_REQUEST, REMOTE_REPO, USER, EMAIL };

const TAG_PREFIX = env("INPUT_TAG_PREFIX", "");
const COMMIT_MESSAGE = env(
    "INPUT_COMMIT_MESSAGE",
    "ci: version bump to {{version}}",
);
const COMMIT_MESSAGE_REGEX = new RegExp(
    COMMIT_MESSAGE.replace(/{{version}}/g, `${TAG_PREFIX}\\d+\\.\\d+\\.\\d+`),
    "ig",
);

export { TAG_PREFIX, COMMIT_MESSAGE, COMMIT_MESSAGE_REGEX };

const MAJOR_WORDING = env("INPUT_MAJOR_WORDING", "BREAKING CHANGES").split(",");
const MINOR_WORDING = env("INPUT_MINOR_WORDING", "feat").split(",");
const PATCH_WORDING = env("INPUT_PATCH_WORDING", "fix").split(",");

export { MAJOR_WORDING, MINOR_WORDING, PATCH_WORDING };
