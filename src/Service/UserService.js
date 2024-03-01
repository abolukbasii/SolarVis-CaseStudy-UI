import axios from 'axios';
import { ApiService } from './ApiService';
import { apiPath } from './ApiPath';
export class UserService {
    _apiService = new ApiService();

    login(data) {
        return axios.post(apiPath.API_BASE_PATH+"/login",data).then(res => res);
    }
    signup(data) {
        return axios.post(apiPath.API_BASE_PATH+"/auth/signup",data).then(res => res);
    }
    getUserInfo(){
        return this._apiService.get(apiPath.API_BASE_PATH+"/getUserInfo");
    }
    updateUser(data){
        return this._apiService.put(apiPath.API_BASE_PATH+"/updateUser",data);
    }
    getAllUsers(){
        return this._apiService.get(apiPath.API_BASE_PATH+"/getAllUsers");
    }
    addUser(data){
        return this._apiService.post(apiPath.API_BASE_PATH+"/addUser", data);
    }
    deleteUser(data){
        return this._apiService.delete(apiPath.API_BASE_PATH+"/deleteUser", data);
    }
    suspendUser(data){
        return this._apiService.put(apiPath.API_BASE_PATH+"/suspendUser", data);
    }
    unsuspendUser(data){
        return this._apiService.put(apiPath.API_BASE_PATH+"/unsuspendUser", data);
    }
    updateUserbyAdmin(data){
        return this._apiService.put(apiPath.API_BASE_PATH+"/updateUserbyAdmin", data);
    }
}