import axios from 'axios';

const postAPILogin = (email, password) => {
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return axios.post('http://http://127.0.0.1:8000/api/login',{
        email:email,
        password:password,
        _token: token
    })
        .then(response => {
            token = response.data.token;
            localStorage.setItem('token', token);

        });
}

export default postAPILogin;