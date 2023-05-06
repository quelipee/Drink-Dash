import axios from 'axios';

const postAPILogin = (email, password) => {
    let token;
    return axios.post('http://localhost:8000/api/login',{
        email:email,
        password:password
    })
        .then(response => {
            token = response.data.token.plainTextToken;
            localStorage.setItem('token', token);
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        });
}

export default postAPILogin;
