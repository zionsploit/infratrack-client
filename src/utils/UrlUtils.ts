export const getURL = (): String => {
    const URL = document.URL;

    let removeHttpProtocol = URL.replace(/^https?:\/\//, '')

    return removeHttpProtocol
}