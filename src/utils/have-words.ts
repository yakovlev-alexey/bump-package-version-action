const haveWords = (messages: string[], words: string[]) => {
    return messages.some((message) =>
        words.some((word) => message.startsWith(word)),
    );
};

export { haveWords };
