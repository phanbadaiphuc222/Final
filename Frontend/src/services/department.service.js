import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class DepartmentService {
    constructor() {
          this.baseUrl = `${url}/api/department`;
          this.baseUrl2 = `${url}/api/department/add`;
          this.api = axios.create({
               headers: {
                    'Content-Type' : 'application/json',
                    Accept : 'application/json',
               },
          });
     }
     
     async getMany() {
          return (await this.api.get(this.baseUrl)).data;
     }

     async getStudentByDepartment(id) {
          return (await this.api.get(`${this.baseUrl}/${id}`)).data;
     }

     async create(department) {
          return (await this.api.post(this.baseUrl2, department)).data;
     }

     async get(id) {
          return (await this.api.get(`${this.baseUrl}/${id}`)).data;
     }
}

export const departmentService = new DepartmentService();