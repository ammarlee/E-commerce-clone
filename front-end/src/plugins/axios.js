
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.baseURL = "https://ammarshop.herokuapp.com/"

// axios.withCredentials= false,
// axios.defaults.withCredentials= false,
export default axios;