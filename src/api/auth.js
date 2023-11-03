import { ENV } from '../utils/constants';

async function register(email, username, password) {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.RESGISTER}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        };
        const response = await fetch(url, params);
        if (response.status !== 200) throw response;
        return response.json();
    } catch (error) {
        throw error;
    }
}
async function Login(identifier, password) {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        };
        console.log('soy params', params.body);
        const response = await fetch(url, params);
        //console.log(response);
        if (response.status !== 200) throw response;
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    register,
    Login,
};
