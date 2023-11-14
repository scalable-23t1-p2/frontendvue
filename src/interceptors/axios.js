import axios from 'axios'

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const {status, data} = await axios.put('/auth/refresh', {}, {
            withCredentials: true
        });

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});

// axios.defaults.baseURL = '127.0.0.1:8000/'
