const knex = require('../database/knex');

class DepartmentService {
    constructor() {
        this.departments = knex('departments');
        this.students = knex('students');
    }

    #register(payload) {
        const department = {...payload};
        const departmentProperties = [
            "name", "id"
        ];

        Object.keys(department).forEach(function(key) {
            if (departmentProperties.indexOf(key) == -1) {
                delete department[key];
            }
        });
        return department;
    }

    async findByName(name) {
        return await this.departments
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async all() {
        return await this.departments.select('*');
    }

    async findAllStudent(id) {
        return await this.students
            .where('department','like', `%${id}`)
            .select('*');
    }

    async create(payload) {
        const department = this.#register(payload);
        await this.departments.insert(department);
        return {...department};
    }

}

module.exports = DepartmentService;