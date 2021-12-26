const getPullRequestNumber = () => {
    return Number(
        /refs\/pull\/(\d+)\/merge/.exec(process.env.GITHUB_REF || "")[1] ||
            null,
    );
};

export { getPullRequestNumber };
