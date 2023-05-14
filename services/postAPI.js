import axios from 'axios';

const postAPI = (url,data) => {
    return axios.post('http://192.168.1.114:8000/api/' + url,data,{
        headers: {
            Authorization: 'Bearer ' +  localStorage.getItem('token')
        }
    });
}

export default postAPI;
