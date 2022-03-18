import { NodeInfo } from '../components/tree-views/interface';
import http from "../apis/https-common";
 class DepartmentDataService {

getAll() {
    return http.get<Array<NodeInfo>>("/departments");
  }
  get(id: string) {
    return http.get<NodeInfo>(`/departments/${id}`);
  }
}
export default new DepartmentDataService();