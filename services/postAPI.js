import axios from 'axios';

const postAPI = (url,data) => {
    return axios.post('http://127.0.0.1:8000/api/' + url,data,{
        headers: {
            Authorization: 'Bearer ' +  localStorage.getItem('token')
        }
    });
}

export default postAPI;
