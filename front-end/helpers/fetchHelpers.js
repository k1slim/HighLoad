import Promise from 'bluebird';

function serializeURLParams(data) {
    let params = '';
    return Object.keys(data).map((k) => {
        params = `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`;
        return params;
    }).join('&');
}

export default function requestWrapper(options) {
    const { url, type, payload } = options;
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        let urlParams = '';
        if (type === 'GET' && payload.length && payload.length > 0) {
            urlParams = '?';
            urlParams += serializeURLParams(payload);
        }
        request.open(type, url + urlParams);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = () => {
            let result;
            if (request.status >= 200 && request.status < 400) {
                if (request.responseText) {
                    const response = JSON.parse(request.responseText);
                    resolve({ data: response });
                } else {
                    resolve({});
                }
            } else {
                try {
                    result = JSON.parse(request.responseText);
                } catch (e) {
                    console.error(e);
                    result = { message: request.responseText, errorCode: request.status };
                }
                if (reject) {
                    reject(result);
                } else {
                    throw new Error(result.message);
                }
            }
        };
        request.onerror = (err) => {
            if (reject) {
                reject(err);
            } else {
                throw new Error(err);
            }
        };
        request.withCredentials = true;
        if (payload && type !== 'GET') {
            request.send(JSON.stringify(payload));
        } else {
            request.send();
        }
    });
}
