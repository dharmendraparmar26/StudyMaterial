const { body, check } = require('express-validator');

exports.registerUserSchema = [
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    check('confirm_password')
        .not().isEmpty()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password and confirm password does not match'),
    check('first_name')
        .not().isEmpty()
        .withMessage('First name required')
];

exports.contactRequestSchema = [
    check('name')
        .not().isEmpty()
        .withMessage('Name is required'),
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),
    check('phone')
        .not().isEmpty()
        .withMessage('Phone is required'),
    check('subject')
        .not().isEmpty()
        .withMessage('Subject is required'),
    check('message')
        .not().isEmpty()
        .withMessage('Message is required'),
];

exports.loginUserSchema = [
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
];