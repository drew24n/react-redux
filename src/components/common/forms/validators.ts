export const required = (value: string) => {
    if (value) return null
    return "This field can't be empty!"
}

export const maxLength = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols!`
    } else return null
}

export const email = (value: string) => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : null
)