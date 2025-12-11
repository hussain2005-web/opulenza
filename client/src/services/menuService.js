import api from './api';

const getAll = () => {
    return api.get('/menu');
};

const create = (data) => {
    return api.post('/menu', data);
};

const update = (id, data) => {
    return api.put(`/menu/${id}`, data);
};

const remove = (id) => {
    return api.delete(`/menu/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};
