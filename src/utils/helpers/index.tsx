export const clipSentence = (str: string, wordAmout: number): string => {
    if(str.length > wordAmout) {
        str = str.substring(0, wordAmout) + '...'
    };
    return str;
};