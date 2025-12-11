import api from './api';

const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const register = (username, password, name, role) => {
    return api.post('/auth/register', { username, password, name, role });
};

export default {
    login,
    logout,
    getCurrentUser,
    register
};
