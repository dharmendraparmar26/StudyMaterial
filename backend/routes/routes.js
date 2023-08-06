const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const config = require('../config');
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        let filetype = '';
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'video/mp4') {
            filetype = 'mp4';
        }
        if (file.mimetype == 'application/pdf') {
            filetype = 'pdf';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
let upload = multer({ storage: storage });
let pdfUplaod = upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'photo', maxCount: 1 }])

const {
    adminLoginSchema, changePasswordSchema,
} = require("../middleware/validators/adminValidator.middleware");

const {
    registerUserSchema, loginUserSchema, contactRequestSchema
} = require("../middleware/validators/userValidator.middleware");

const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller');

// Users routing
router.post('/userRegister', registerUserSchema, userController.userRegister.bind());
router.post('/login', loginUserSchema, userController.login.bind());
router.get('/getstatistics', userController.getstatistics.bind());
router.get('/getCourses', userController.getCourses.bind());
router.post('/getCoursesMaterials', userController.getCoursesMaterials.bind());
router.post('/contactFormRequest',contactRequestSchema, userController.contactFormRequest.bind());

// Admin Routing
router.post('/adminLogin', adminLoginSchema, adminController.adminLogin.bind());
router.post('/getUsersList',ensureWebTokenForAdmin, adminController.getUsersList.bind());
router.post('/getDashboardStatistics',ensureWebTokenForAdmin, adminController.getDashboardStatistics.bind());
router.post('/getcourselist', adminController.getcourselist.bind());
router.post('/userblock', ensureWebTokenForAdmin, adminController.userblock.bind());
router.post('/userUnblock', ensureWebTokenForAdmin, adminController.userUnblock.bind());
router.post('/insertCourseAction',pdfUplaod, ensureWebTokenForAdmin, adminController.insertCourseAction.bind());
router.post('/deletecourse', ensureWebTokenForAdmin, adminController.deletecourse.bind());
router.get('/getMaterialsList', ensureWebTokenForAdmin, adminController.getMaterialsList.bind());
router.post('/insertMaterial', ensureWebTokenForAdmin,  pdfUplaod, adminController.insertMaterial.bind());
router.post('/changePassword',ensureWebTokenForAdmin, changePasswordSchema,adminController.changePassword.bind());

const path1 = require('path')
exports.getImage = async (req, res) => {
    const image = req.params.image;
    const myPath = path1.resolve(process.cwd(), "uploads", image);
    res.sendFile(myPath);
}
const getFile = require('../controllers/getFile');
router.get("/uploads/:image", getFile.getImage);

router.get("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});
router.post("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});

function ensureWebTokenForAdmin(req, res, next) {
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWTForAdmin(req, res, next);
    } else {
        res.sendStatus(403);
    }
}
async function verifyJWTForAdmin(req, res, next) {
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            if (req.user.role != 'cpadmin') {
                return res.sendStatus(403);
            }
            next();
        }
    })
}

module.exports.routes = router;