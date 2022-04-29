import axios from 'axios';
import Qs from 'qs';
const API = axios.create({
	baseURL:"http://localhost:8081/TestForm/",
	timeout:20000
});

API.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
API.defaults.transformRequest = [obj=>Qs.stringify(obj)];
export default API ;