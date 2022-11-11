const StudentService = require('../services/student.service');
const ApiError = require('../api-error');

exports.create = (req, res) => {
    return res.send({ message: 'create handler'});
};

// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, '../image');
//       },
//       filename: function (req, file, callback) {
//         callback(null, file.fieldname);
//       }
// })

exports.findAllStudent = async (req, res, next) => {
    let students = [];
    try {
        const studentService = new StudentService();
        const {name} = req.query;
        if (name) {
            students = await studentService.findByName(name);
        } else {
            students = await studentService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving students')
        );
    }

    return res.send(students);
};

exports.createStudent = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const studentService = new StudentService();
        const student = await studentService.createStudent(req.body);
        return res.send(student);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the student')
        );
    }
};

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const studentService = new StudentService();
        const update = await studentService.update(req.params.id, req.body);
        if (!update) {
            return next(new ApiError(404, 'Student not found'));
        }
        return res.send({message: 'Student was update successfully'});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try {
        const studentService = new StudentService();
        const deleted = await studentService.delete(req.params.id);
        if (!deleted) {
            return next (new ApiError(404, 'Student not found'));
        }
        return res.send({message: 'Student was deleted successfully'});
    } catch (error) {
        console.log(error);
        return next (
            new ApiError(
                500,
                `Could not delete student with id = ${req.params.id}`
            )
        );
    }
    // return res.send({ message: 'findOne handler'});
};

exports.findStudentById = async (req, res, next) => {
    try {
        const studentService = new StudentService();
        const student = await studentService.findStudentById(req.params.id);
        if (!student) {
            return next(new ApiError(404, 'Students not found'));
        }
        return res.send(student);
    } catch (error) {
        console.log(error);
        return next (
            new ApiError(
                500,
                `Error retrieving student with id = ${req.params.id}`
            )
        );
    }
};

exports.findStudentByDepartment = async (req, res, next) => {
    try {
        const studentService = new StudentService();
        const student = await studentService.findAllStudent(req.params.id);
        if (!student) {
            return next(new ApiError(404, 'Student not found'));
        }
        return res.send(student);
    } catch (error) {
        console.log(error);
        return next (
            new ApiError(
                500,
                `Error retrieving student with id = ${req.params.id}`
            )
        );
    }
};
