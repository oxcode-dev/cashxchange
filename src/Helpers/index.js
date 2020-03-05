export const o_O = (promise) => {
    return promise.then(data => {
        if(data instanceof Error) return [data]
        return [null, data]
    }).catch(err => [err])
}

export const urlString = (str) => {
    return str.toLowerCase().replace(new RegExp(' ', 'g'), '+');
}
