import axios from 'axios';
import authHeader from './auth-header';

const USERS_URL = "http://localhost:8080/api/operatorList/list";

class operatorServiceList {
  getListForCalls() {
    return axios.get(USERS_URL, { headers: authHeader()});
  }

}
export default new operatorServiceList();