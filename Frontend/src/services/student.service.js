import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class StudentService {
    constructor() {
        this.baseUrl = `${url}/api/student`;
        this.baseUrl2 = `${url}/api/student/add`;
        this.baseUrl3 = `${url}/api/student/modify`;
        this.baseUrl4 = `${url}/api`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        this.ImageApi = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });
    }

    async getMany() {
          return (await this.api.get(this.baseUrl)).data;
    }

    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }

    // async create(student) {
    //     return (await this.api.post(this.baseUrl2, student)).data;
    // }

    async create(student) {
        return (await this.ImageApi.post(this.baseUrl2, student)).data;
    }

    async getStudentByDepartment(id) {
        return (await this.api.get(`${this.baseUrl4}/${id}`)).data;
    }

    async getDepartmentById() {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }

    // async login(account) {
    //     return (await this.api.post(this.baseUrl2, account)).data;
    // }

    // async deleteMany() {
    //     return (await this.api.delete(this.baseUrl)).data;
    // }

    // async get(id) {
    //     return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    // }

    async update(id, student) {
        return (await this.api.put(`${this.baseUrl}/${id}`, student)).data;
    }

    async deleteStudent(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const studentService = new StudentService();