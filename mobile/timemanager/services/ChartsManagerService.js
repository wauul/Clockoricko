import axios from "axios";
import moment from "moment";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

export default class ChartsManagerService {

    static async getLineChart() {
        await AuthService.refreshAccessToken();
        const now = new Date();
        const end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `https://8e76-163-5-23-136.eu.ngrok.io/api/chartmanager/linechart/${parseInt(jwt_decode(await SecureStore.getItemAsync('access_token')).sub)}?start=${start}&end=${end}`,
            headers:{
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
        });
    }


}
