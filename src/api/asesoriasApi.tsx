import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.1.80:3000/api/v1';

const asesoriasApi = axios.create( {baseURL} );

//Validación del token en cada petición
/*asesoriasApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers['token'] = token;

            return config;
        }
    }
)*/


export default asesoriasApi;