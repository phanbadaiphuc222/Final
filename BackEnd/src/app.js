const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const multer = require('multer');
const accountController = require('./controllers/account.controller');
const studentController = require('./controllers/student.controller');
const departmentController = require('./controllers/department.controller');
const ApiError = require('./api-error');
const { application } = require('express');
// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

const upload = multer({
    dest: './avatar/'
})

app.use(cors());
app.use('/avatar', express.static(path.join(__dirname + '/../avatar')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.json ({ message: 'Welcome to contact book application.'});
});

app.route('/api/register')
    .post(accountController.register);

app.route('/api/login')
    .post(accountController.login)
    .get(accountController.findAllUser);

app.route('/api/student')
    .get(studentController.findAllStudent);

app.route('/api/student/:id')
    .get(studentController.findStudentById)
    .delete(studentController.delete)
    .put(studentController.update);

app.route('/api/student/add')
    .post(studentController.uploadAvatar.single('image'), studentController.createStudent); 

app.route('/api/register/:email')    
    .get(accountController.findAllUser);

app.route('/api/department')
    .get(departmentController.findAllDepartment)

app.route('/api/department/add')
    .post(departmentController.create)
    // .delete(departmentController.deleteAll);
    
app.route('/api/:id')
    .get(studentController.findStudentByDepartment);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});
    
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});

// let encodeUrl = parseUrl.urlencoded({ extended: false });

// app.post('/register', encodeUrl, (req, res) => {
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var userName = req.body.userName;
//     var password = req.body.password;
// });

module.exports = app;

// app.route('/api/contatcs/:id')
//     .get(contactController.findOne)
//     .put(contactController.update)
//     .delete(contactController.delete);