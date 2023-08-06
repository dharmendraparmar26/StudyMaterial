const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const config = require("../config");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersEmail = await UserModel.getUsersDetails(req.body.email);

    if (getUsersEmail.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Email already registered! Try with new email."
      });
    }

    const Token = jwt.sign({
      email: req.body.email
    }, config.JWT_SECRET_KEY)

    const hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
    let users = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": req.body.email,
      "password": hash,
      "bio": req.body.bio,
    }

    let saveUserDetails = await UserModel.saveUserDetails(users);
    if (saveUserDetails) {
      return res.status(200).send({
        success: true,
        msg: "Registered successfully!!"
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again."
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "User not registered due to internal error",
      err
    });
  }
}

exports.login = async (req, res) => {
  try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(200).send({
              success: false,
              msg: `${errors.errors[0].msg}`,
          });
      }

      let getUsersEmail = await UserModel.getUsersDetails(req.body.email);
      if (getUsersEmail.length > 0) {

          let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
          if (getUsersEmail[0].password === hash) {
              const jwtToken = jwt.sign({
                  email: req.body.email,
                  id: getUsersEmail[0].id,
              }, config.JWT_SECRET_KEY, {
                  expiresIn: config.SESSION_EXPIRES_IN
              });

              return res.status(200).send({
                  success: true,
                  msg: "Login Successful",
                  data: {
                      'id': getUsersEmail[0].id,
                      'first_name': getUsersEmail[0].first_name,
                      'email': getUsersEmail[0].email,
                      'authToken': jwtToken,
                  }
              });
          } else {
              return res.status(200).send({
                  success: false,
                  msg: "Password does not match"
              });
          }
          // }
      } else {
          return res.status(200).send({
              success: false,
              msg: "User not found."
          });
      }
  } catch (err) {
      return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
          err
      });
  }
}

exports.getstatistics = async (req, res) => {
  try {
      let getstatistics = await UserModel.getstatistics();
      if (getstatistics.length > 0) {
        return res.status(200).send({
          success: true,
          msg: "Statistics Data",
          data: getstatistics[0]
      });
      } else {
          return res.status(200).send({
              success: false,
              msg: "User not found."
          });
      }
  } catch (err) {
      return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
          err
      });
  }
}

exports.getCourses = async (req, res) => {
  try {
      let getCourses = await UserModel.getCourses();
      if (getCourses.length > 0) {
        return res.status(200).send({
          success: true,
          msg: "Statistics Data",
          data: getCourses
      });
      } else {
          return res.status(200).send({
              success: false,
              msg: "User not found."
          });
      }
  } catch (err) {
      return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
          err
      });
  }
}

exports.getCoursesMaterials = async (req, res) => {
  try {
      let getCoursesMaterials = await UserModel.getCoursesMaterials(req.body);
      if (getCoursesMaterials.length > 0) {
        return res.status(200).send({
          success: true,
          msg: "Statistics Data",
          data: getCoursesMaterials
      });
      } else {
          return res.status(200).send({
              success: false,
              msg: "User not found."
          });
      }
  } catch (err) {
      return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
          err
      });
  }
}

exports.contactFormRequest = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(200).send({
          success: false,
          msg: `${errors.errors[0].msg}`,
      });
  }

  let contactRequest = await UserModel.addcontactRequest(req.body);
  if (contactRequest) {
      return res.status(200).send({
          success: true,
          msg: "Contact request submited!!",
      });
  } else {
      return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again!!"
      });
  }
}