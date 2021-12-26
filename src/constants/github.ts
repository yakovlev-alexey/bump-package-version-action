import { context } from "@actions/github";

import { env } from "../utils/env";

const EVENT_PATH = env("GITHUB_EVENT_PATH");
const WORKSPACE = env("GITHUB_WORKSPACE");

export { EVENT_PATH, WORKSPACE };

const IS_PULL_REQUEST = Boolean(env("GITHUB_HEAD_REF"));
const PULL_REQUEST_NUMBER = (context as { number?: number }).number;

export { IS_PULL_REQUEST, PULL_REQUEST_NUMBER };

const REPO = env("GITHUB_REPOSITORY");
const REMOTE_REPO = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${REPO}.git`;
const USER = env("GUTHUB_USER", "Automated Version Bump");
const EMAIL = env(
    "GUTHUB_EMAIL",
    "bump-package-version-action@users.noreply.github.com",
);

export { REPO, REMOTE_REPO, USER, EMAIL };
