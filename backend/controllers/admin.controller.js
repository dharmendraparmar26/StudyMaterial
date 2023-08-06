const AdminModel = require("../models/admin.model");
const requestIp = require("request-ip");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const config = require("../config");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getAdminInfo(req.body);
    if (result.length > 0) {
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

      if (result[0].password === hash) {
        const jwtToken = jwt.sign(
          {
            email: req.body.username,
            id: result[0].id,
            role: "cpadmin",
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );

        return res.status(200).send({
          success: true,
          msg: "Login Successfully",
          data: {
            id: result[0].id,
            username: result[0].username,
            authToken: jwtToken,
            role: result[0].user_role,
          },
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Password does not match",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    let result = await AdminModel.getUsersList(req.body);
   return res.status(200).send({
      success: true,
      msg: "Users List!",
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getDashboardStatistics = async (req, res) => {
  try {
    let result = await AdminModel.getDashboardStatistics();
    return res.status(200).send({
      success: true,
      msg: "Dashboard Statistics!",
      data: result,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.userblock = async (req, res) => {
  try {
    let result = await AdminModel.userblock(req.body);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "User Blocked!",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong. Please try again!",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.userUnblock = async (req, res) => {
  try {
    let result = await AdminModel.userUnblock(req.body);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "User UnBlock!",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong. Please try again!",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.getcourselist = async (req, res) => {
  try {
    let result = await AdminModel.getcourselist();
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Course list",
        data: result
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found"
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.insertCourseAction = async (req, res) => {
  try {
    // Check course if already exist
    let getCourse = '';
    if(parseInt(req.body.isEdit)){
      getCourse = await AdminModel.checkCourseEdit(req.body);
    }else{
      getCourse = await AdminModel.checkCourse(req.body);
    }
    if(getCourse.length > 0){
      return res.status(200).send({
        success: false,
        msg: "Course name already exist."
      });
    }

    let result = '';
    req.body.photo = (!req.files['photo']) ? null : req.files['photo'][0].filename;

    if(parseInt(req.body.isEdit) == 1){
      // Insert New Course 
      if(!req.body.photo || req.body.photo == null){
          req.body.photo = req.body.old_photo;
      }
      console.log(req.body);
      result = await AdminModel.updateCourseAction(req.body);
    }else{
      // Insert New Course 
      result = await AdminModel.insertCourseAction(req.body);
    }

    if (result) {
      return res.status(200).send({
        success: true,
        msg: parseInt(req.body.isEdit)? "Course updated successfully" : "Course added successfully"
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.deletecourse = async (req, res) => {
  try {
    let result = await AdminModel.deletecourse(req.body);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Course deleted successfully"
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again"
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.getMaterialsList = async (req, res) => {
  try {
    let result = await AdminModel.getMaterialsList();
    return res.status(200).send({
      success: true,
      msg: "Materials List",
      data: result,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.insertMaterial = async (req, res) => {
  try {

    if(!req.body.year){
      return res.status(200).send({
        success: false,
        msg: "Year field required",
      });
    }

    if(!req.body.content){
      return res.status(200).send({
        success: false,
        msg: "Content field required",
      });
    }  
    
    if(!req.body.subject){
      return res.status(200).send({
        success: false,
        msg: "Subject field required",
      });
    }      

    if(!req.body.year){
      return res.status(200).send({
        success: false,
        msg: "Year field required",
      });
    }          

    req.body.pdfname = (!req.files['pdf']) ? null : req.files['pdf'][0].filename;
    req.body.photo = (!req.files['photo']) ? null : req.files['photo'][0].filename;
    let result = await AdminModel.insertMaterial(req.body);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Data Listed successfully!",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong Please try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getAdminInfo(req.body);
    if (result.length > 0) {
      let currentPassword = CryptoJS.SHA256(req.body.currentPassword).toString(
        CryptoJS.enc.Hex
      );

      if (currentPassword === result[0].password) {
        let newPassword = CryptoJS.SHA256(req.body.newPassword).toString(
          CryptoJS.enc.Hex
        );

        if (req.body.newPassword == req.body.confirmPassword) {
          let response = await AdminModel.changePassword(
            newPassword,
            result[0].id
          );
          if (response) {
            return res.status(200).send({
              success: true,
              msg: "Password updated successfully!",
            });
          } else {
            return res.status(200).send({
              success: false,
              msg: "Password update failed!",
            });
          }
        } else {
          return res.status(200).send({
            success: false,
            msg: "Confirm password dose not match!",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: "Current password dose not match!",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Invalid user!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};