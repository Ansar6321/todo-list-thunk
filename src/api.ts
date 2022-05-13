import { AuthResponse, LoginRequest } from "./models";

const login = async (request: LoginRequest) => {
    const response = await fetch('https://api-nodejs-todolist.herokuapp.com/user/login/', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return await response.json() as AuthResponse;
    }
    throw new Error(await response.text());
}

const logOut = async (token: string) => {
    const response = await fetch('https://api-nodejs-todolist.herokuapp.com/user/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Can\'t log out!');
    }
}

const api = { login, logOut };
export default api;