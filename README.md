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

> It is however important that only `pull_request` events from the base repository are handled by default. It is unsafe to expose publishing tokens to use in PRs from unknown contributors and GitHub Actions themself do not allow you to access secrets in such Pull Requests. Therefore by default `abort-for-forks` option is enabled. If you have a use for this action in fork PRs disable this option.

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
                  # abort action immediately when called in PR from a fork
                  abort-for-forks: "true"
```

## Recipes

In this section you may find a few ready-made workflows to use in your projects.

### Basic npm package

A very basic [workflow](https://gist.github.com/yakovlev-alexey/b8019044854bb196307e1d7eefc663ab) with no validations made just for automatically versioning and publishing your npm package on pushes to your `main` branch. May also publish RCs if `pull_request` event is enabled.

```yml
# .github/workflows/main.yml
name: main

on:
    push:
        branches:
            - main
    pull_request:
        branches:
            - main

jobs:
    release:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0

            - name: Bump version
              id: bump-version
              uses: "yakovlev-alexey/bump-package-version-action@v1.1.0"
              env:
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              with:
                  major-wording: "feat!"
                  minor-wording: "feat"
                  patch-wording: "fix"

            - name: Publish npm
              if: steps.bump-version.outputs.version != null
              env:
                  NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
              run: yarn publish --non-interactive --registry https://registry.npmjs.org/
```

### Advanced npm package

A more advanced example with multiple jobs to reflect different stages of CI. This workflow allows static type checking, test running and publishing as separate jobs with caching to increase execution speed. Whole file is available as a [Gist](https://gist.github.com/yakovlev-alexey/75a1d1e519eff586b518624c81fc0930).

```yml
# .github/workflows/main.yml
name: main

on:
    push:
        branches:
            - main
    pull_request:
        branches:
            - main

jobs:
    sanity:
        runs-on: ubuntu-latest
        steps:
            # ...

    unit:
        needs: sanity
        runs-on: ubuntu-latest
        steps:
            # ...

    release:
        needs: unit
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0

            - name: Bump version
              id: bump-version
              uses: "yakovlev-alexey/bump-package-version-action@v1.1.0"
              env:
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              with:
                  major-wording: "feat!"
                  minor-wording: "feat"
                  patch-wording: "fix"

            - name: Set cache directory
              # unfortunately a job can't be stopped with success preemptively
              if: steps.bump-version.outputs.version != null
              id: yarn-cache-dir-path
              run: echo "::set-output name=dir::$(yarn cache dir)"

            - uses: actions/cache@v2
              if: steps.bump-version.outputs.version != null
              id: yarn-cache
              with:
                  path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
                  key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
                  restore-keys: |
                      ${{ runner.os }}-yarn-

            - name: Install dependencies
              if: steps.bump-version.outputs.version != null
              run: yarn --frozen-lockfile

            - name: Publish npm
              if: steps.bump-version.outputs.version != null
              env:
                  NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
              run: yarn publish --non-interactive --registry https://registry.npmjs.org/
```

### Other cases

`bump-package-version-action` can be used for other cases as well: for example, you might want to update package version and create website build with this new version. Only differences compared to previous example would be in the final steps of the jobs. You might not even want to publish anything - just keep track of versions. This is the case with `bump-package-version-action` itself: Actions do not need to be published to npm, but having separate tags with semantic versions is very helpful. Check out [`main.yml`](/.github/workflows/main.yml).

```yml
# .github/workflows/main.yml
name: "Main"

on:
    push:
        branches:
            - main

jobs:
    node-ci:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0

            - name: Install dependencies
              run: yarn --frozen-lockfile
            - name: Lint
              run: yarn lint

            - name: "Bump version"
              uses: "yakovlev-alexey/bump-package-version-action@main"
              env:
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              with:
                  minor-wording: "feat"
                  major-wording: "feat!,BREAKING CHANGES"
                  patch-wording: "fix"
```

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
