export const GetMethod = async (method) => {
    const response = await fetch(method, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}

export const PostMethod = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    return response;
}

