const DepartmentService = require('../services/department.service');
const ApiError = require('../api-error');

exports.create = (req, res) => {
    return res.send({ message: 'create handler'});
};

exports.findAllDepartment = async (req, res, next) => {
    let departments = [];
    try {
        const departmentService = new DepartmentService();
        const {name} = req.query;
        if (name) {
            departments = await departmentService.findByName(name);
        } else {
            departments = await departmentService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving departments')
        );
    }

    return res.send(departments);
};

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const departmenttService = new DepartmentService();
        const department = await departmenttService.create(req.body);
        return res.send(department);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the department')
        );
    }
};