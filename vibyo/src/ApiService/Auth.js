export const GetMethod = async (url,token) => {
    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
       });
       return response;
    } catch (error) {
        throw Error("Failed to send request");
    }
}

export const PostMethod = async (url, body) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    return response;
    } catch (error) {
        throw Error("Failed to send request")
    }
}

