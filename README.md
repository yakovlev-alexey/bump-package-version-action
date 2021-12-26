# Bump Package Version Action

A simple GitHub Action to automatically bump npm versions. Designed to be used with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Table of Contents

-   [Bump Package Version Action](#bump-package-version-action)
-   [Table of Contents](#table-of-contents)
-   [Usage](#usage)
-   [Recipes](#recipes)
-   [Comparison to other actions](#comparison-to-other-actions)
-   [Contributing](#contributing)
-   [Acknowledgments](#acknowledgments)
-   [License](#license)

## Usage

This action allows you to automatically update versions in your `package.json`. It scans newly pushed commits for keywords in messages. If any matches are found it updates the version in `package.json` and optionally (enabled by default) commits, tags and pushes changes to caller branch. There is also support for canary versions - if this action was called in a `pull_request` event, it will create a canary version from the latest commit (according to all commit messages in PR).

```yml
jobs:
    bump:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0

            - name: "Bump version"
              uses: "yakovlev-alexey/bump-package-version-action@main"
              env:
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              with:
                  # messages starting with this words will result in a major version bump
                  major-wording: "feat!"
                  # messages starting with this words will result in a minor version bump
                  minor-wording: "feat"
                  # messages starting with this words will result in a patch version bump
                  # separate keywords using a comma
                  patch-wording: "fix,docs"

                  # create a custom commit message ({{version}} will be replaced with the actual version after bump)
                  commit-message: "ci: version bump to {{version}}"
                  # skip pushing resulting tag/commit
                  skip-push: "false"
                  # skip tagging resulting version
                  skip-tag: "false"
                  # skip commiting resulting bump
                  skip-commit: "false"
                  # skip commiting, tagging and pushing for canary versions (PRs)
                  skip-for-canary: "true"
```

## Recipes

> TODO: Recipes are coming

## Comparison to other actions

You may ask: how is this action different from a few other implementations of automated version bumps?

My primary concern with other packages was code quality - I was unable to fully understand which code was responsible for what. That's why this action is written completely in TypeScript and has linters installed.

I was also unsure of how other actions bump versions (partly due to spaghetti code). In this action I'm heavily investing in providing great documentation, support and ready to use recipes.

I also have a roadmap of improving this action with one the great upcoming features being ability to use plugins - `bump-package-version-action` should turn into `bump-version-action` with a few plugins like `bump-npm-version-action`, `bump-yarn-version-action`, `bump-pypi-version-action` and so on. See [issues](https://github.com/yakovlev-alexey/nestjs-minio-module/issues) for more details on future plans

## Contributing

Feel free to send any suggestions in [GitHub issues](https://github.com/yakovlev-alexey/nestjs-minio-module/issues): comment or vote on an existing issue, open a new one or create a Pull Request with your feature.

## Acknowledgments

This package is largely inspired by [`gh-action-bump-version`](https://github.com/phips28/gh-action-bump-version) by [`@phips28`](https://github.com/phips28).

## License

[MIT](/LICENSE)
