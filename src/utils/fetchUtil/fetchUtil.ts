const BASE_URL = 'http://localhost:3000/api'
export const fetchUtil = async (
    url: string,
    init?: RequestInit
): Promise<Response> => {
    return await fetch(`${BASE_URL}${url}`, { ...init })
}
