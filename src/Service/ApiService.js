import axios from "axios";
import { apiPath } from "./ApiPath";

export class ApiService {
    
  http = axios.create({
    baseURL: apiPath.API_BASE_PATH,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
  });

  get(url) {
    return this.http.get(url).then(res => res.data);
  }

  post(url, data) {
    return this.http.post(url, data).then(res => res.data);
  }

  put(url, data) {
    return this.http.put(url, data).then(res => res.data);
  }

  delete(url, data) {
    return this.http.delete(url, {data}).then(res => res.data);
  }
  
  postNoData(url) {
    return this.http.post(url).then(res => res.data);
  }
}
