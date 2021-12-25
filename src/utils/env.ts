const env = (name: string, defaultValue?: string): string | undefined => {
    return process.env[name] || defaultValue;
};

export { env };
