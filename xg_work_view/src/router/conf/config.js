import axios from 'axios'
axios.defaults.baseURL = process.env.API_ROOT;
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem("_workToken");
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
