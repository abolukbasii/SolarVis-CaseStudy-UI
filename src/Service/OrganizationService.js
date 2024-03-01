import { ApiService } from './ApiService';
import { apiPath } from './ApiPath';
export class OrganizationService {
    _apiService = new ApiService();

    suspendOrganization(){
        return this._apiService.put(apiPath.API_BASE_PATH+"/suspendOrganization");
    }
    unsuspendOrganization(){
        return this._apiService.put(apiPath.API_BASE_PATH+"/unsuspendOrganization");
    }

}