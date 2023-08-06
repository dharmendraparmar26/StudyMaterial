const { body, check } = require("express-validator");

exports.adminLoginSchema = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
];

exports.changePasswordSchema = [
  check("currentPassword")
    .not()
    .isEmpty()
    .withMessage("Current password is required"),
  check("newPassword")
    .not()
    .isEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast six character!"),
  check("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required"),
];