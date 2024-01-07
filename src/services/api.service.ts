import axios from 'axios';

export let api = axios.create({
    // baseURL: `http://192.168.71.146:3333/api/v1`,
    baseURL: `http://localhost:3333/api/v1`,
    timeout: 100000,
    timeoutErrorMessage: "Execeeded timeout of 100 seconds"
});

// export const setHeaderAuthorization = (basicAuth: string) => {
//     const encodedToken = Buffer.from(basicAuth).toString('base64');
//      api.defaults.headers.common['Authorization'] = `Basic ${excondedToken}`;
// };