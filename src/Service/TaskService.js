import { ApiService } from './ApiService';

export class TaskService {
    _apiService = new ApiService();

    getUserTasks() {
        return this._apiService.get("/getUserTasks");
    }
    deleteTask(data) {
        return this._apiService.delete("/deleteTask", data);
    }
    userCreateTask(data) {
        return this._apiService.post("/userCreateTask", data);
    }
    getAllTasks() {
        return this._apiService.get("/getAllTasks");
    }
    superAdminCreateTask(data){
        return this._apiService.post("/superAdminCreateTask", data);
    }
    superAdminUpdateTask(data){
        return this._apiService.put("/superAdminUpdateTask", data);
    }
    updateTask(data){
        return this._apiService.put("/updateTask", data);
    }
}
