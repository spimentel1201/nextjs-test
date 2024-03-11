export const isValidEmail = (email: string): boolean => {
    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )

    return !!match
}

export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email) ? undefined : 'El correo no parece ser válido'
}

export const checkIfValidlatitudeAndlongitude = (str: string) => {
    // Regular expression to check if string is a latitude and longitude
    const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi

    return regexExp.test(str)
}
