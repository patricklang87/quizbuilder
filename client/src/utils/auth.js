import axios from 'axios';

//Set config/headers and token
export const tokenConfig = () => {
    const token = localStorage.getItem('quizbuilder_token');
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    } else {
        console.log('no token saved');
    }

    return config;
}

//Process resulting data from login request
const userLogin = (response) => {
    localStorage.setItem('quizbuilder_token', response.data.token);
}

//Login request
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post('/api/auth/', { email, password });
        userLogin(response);
        return response;
    } catch (err) {
        throw err;
    }
}

//Get user data if logged in
export const getUserData = async () => {
    try {
        const response = await axios.get('/api/auth', tokenConfig());
        return response;
    } catch (err) {
        console.log(err)
    }
}