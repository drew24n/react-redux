export const required = (value) => {
    if (value) return undefined;
    return "This field can't be empty!";

};

export const maxLenght = (maxLength) => (value) => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols!`
    } else return undefined
};