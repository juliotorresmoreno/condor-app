

async function _fetch(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, {
        mode: 'cors',
        ...init
    });

    return response;
}

export default _fetch;