import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081/';
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  });//请求拦截器
axios.interceptors.response.use(response => {
  console.log(response);
  return response.data;
}, (responseError) => {
});//响应拦截器
