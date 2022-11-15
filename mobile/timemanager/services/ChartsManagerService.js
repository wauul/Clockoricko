import axios from "axios";
import moment from "moment";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";

export default class ChartsManagerService {
    static async getLineChart(userID) {
        await AuthService.refreshAccessToken();
        const now = new Date();
        const end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/chartmanager/linechart/${userID}?start=${start}&end=${end}`,
            headers:{
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
        });
    }
}
