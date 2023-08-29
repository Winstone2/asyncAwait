function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

// Assume you have a function 'request' that makes an HTTP request
async function request(url) {
    // Implement your HTTP request logic here
}

async function requestWithRetry(url) {
    const MAX_RETRIES = 10;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            return await request(url);
        } catch (err) {
            const timeout = Math.pow(2, i);
            console.log('Waiting', timeout, 'ms');
            await wait(timeout);
            console.log('Retrying', err.message, i);
        }
    }
    throw new Error('Max retries reached'); // Optional: Handle max retries gracefully
}

// Usage example:
const url = 'https://example.com/api/resource';
requestWithRetry(url)
    .then((response) => {
        console.log('Success', response);
    })
    .catch((error) => {
        console.error('Failed after retries', error.message);
    });
