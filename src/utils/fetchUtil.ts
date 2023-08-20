const BASE_URL = '/api';
export const fetchUtil = async (url: string, init?: RequestInit): Promise<Response> => {
    console.log(`${BASE_URL}${url}`)
    return await fetch(`${BASE_URL}${url}`, init);

}