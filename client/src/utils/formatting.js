export const textLength = (text, max) => {
    if (text.length > max) {
        text = text.slice(0, n) 
        text += '...';
    }
    return text;
}