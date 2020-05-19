export const required = (value) => {
    if (value) return null
    return "This field can't be empty!"
}

export const maxLength = (maxLength) => (value) => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols!`
    } else return null
}

export const email = (value) => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : null
)