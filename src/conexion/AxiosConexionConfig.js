import axios from "axios";
import { baseURL } from "configuracion/constantes";
//import store from '../Store/reducers/rootReducer';
const axiosConexionConfig = () => {
    //Create default options
    const defaultOptions = {
        baseURL: baseURL,
        headers: {
            'Access-Control-Max-Age': '600',
            'Content-Type': 'application/json',
        }
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    //Create an interceptor for each request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access_token');
        //console.log("token:"+token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    });

    //Create an interceptor for each response
    /*instance.interceptors.response.use(function (response) {
            //console.log(response.data.body.error);
            if (response.data.body.error && response.data.body.error.code===8){
                window.location.href = '/logout'
            } else {
                return response;
            }
        },
        function (error) {
            console.log(error.response);
        }
    );*/
    return instance;
};
export default (axiosConexionConfig());
