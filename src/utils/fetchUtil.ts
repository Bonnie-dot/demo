const BASE_URL = 'http://localhost:8080';
export const fetchUtil = async (url: string, init?: RequestInit): Promise<Response> => {
    return await fetch(`${BASE_URL}${url}`, {...init});

}