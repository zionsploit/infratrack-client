
// This utils parse the response message response into readable message
export const parseResponseMessage = (text: string): String => {
    return text.replace(/([A-Z])/g, ' $1').trim();
}