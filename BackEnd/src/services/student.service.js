const knex = require('../database/knex');

class StudentService {

    constructor() {
        this.students = knex('students');
    }

    #getStudent(payload) {
        const student = {...payload};
        const studentProperties = [
            "name", "id", "email", "DOB", "hometown", "major", "department"
        ];

        Object.keys(student).forEach(function(key) {
            if (studentProperties.indexOf(key) == -1) {
                delete student[key];
            }
        });
        return student;
    }

    #register(payload) {
        const student = {...payload};
        const studentProperties = [
            "name", "id", "email", "DOB", "hometown", "major", "department"
        ];

        Object.keys(student).forEach(function(key) {
            if (studentProperties.indexOf(key) == -1) {
                delete student[key];
            }
        });
        return student;
    }

    async update(id, payload) {
        const update = this.#getStudent(payload);
        return await this.students.where('id', id).update(update);
    }

    // async findByName(name) {
    //     return await this.accounts
    //         .where('name', 'like', `%${name}%`)
    //         .select('*');
    // }

    // async findByPassword(password) {
    //     return await this.accounts
    //         .where('password', password)
    //         .select('*');
    // }

    // async login(email, password) {
    //     return await this.accounts
    //     .where('email', 'like', `%${email}%`)
    //     .where('password', 'like', `%${password}%`)
    //     .select('*');
    // }

    async all () {
        return await this.students.select('*');
    }

    async createStudent(payload) {
        const student = this.#register(payload);
        await this.students.insert(student);
        return {...student};
    }

    async delete(id) {
        return await this.students.where('id', id).del();
    }

    async findStudentById(id ) {
        return await this.students.where('id', id).select('*').first();
    }

    async findAllStudent(id) {
        return await this.students
            .where('department','like', `%${id}`)
            .select('*');
    }

}

module.exports = StudentService;