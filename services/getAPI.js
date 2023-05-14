import axios from 'axios';

const getAPI = (data) => {
    return axios.get('http://192.168.1.114:8000/api/' + data,{
        headers: {
            Authorization: 'Bearer ' +  localStorage.getItem('token')
        }
    }).then(response =>{
        return response.data;
    }).catch(error =>{
        console.log(error);
        return [];
    })
}

export default getAPI;
