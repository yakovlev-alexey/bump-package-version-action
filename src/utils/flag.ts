const flag = (name: string, defaultValue = false): boolean => {
    const env = process.env[name];

    return env === "true" || (env !== "false" && defaultValue);
};

export { flag };
