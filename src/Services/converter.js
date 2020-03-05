import axios from 'axios'
const BASE_URL = 'https://api.exchangeratesapi.io/';

export const converter = (base, date=null) => {
    let now = date ? date : new Date().toJSON().slice(0,10);
    let url = BASE_URL + now + '?base=' + base;
    return axios.get(url);
}