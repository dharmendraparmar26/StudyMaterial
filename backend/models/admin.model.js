const config = require("../config");
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: config.mysqlHost,
  user: config.user,
  password: process.env.DB_PASS || config.password,
  database: config.database,
  port: config.mysqlPort,
});
const promisePool = pool.promise();

class AdminModel {

  getMaterialsList = async (data) => {
    let sql = `SELECT m.*, c.name as course_name FROM materials as m LEFT JOIN course as c ON m.course_id = c.id ORDER BY m.id DESC`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  insertMaterial = async (data) => {
    let sql = `INSERT INTO materials (
      course_id, 
      subject,
      photo,
      year, 
      content, 
      pdf ) 
      values(
        '${data.course_id}',
        '${data.subject}',
        '${data.photo}',
        '${data.year}',
        '${data.content? data.content.replace(/'/g, "''") : ''}',
        '${data.pdfname}'
        )`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  checkCourse = async (data) => {
    let sql = `SELECT * FROM course WHERE name = '${data.name}'`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  checkCourseEdit = async (data) => {
    let sql = `SELECT * FROM course WHERE name = '${data.name}' AND id != ${data.id}`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };  

  insertCourseAction = async (data) => {
    let sql = `INSERT INTO course (name, description, photo) values('${data.name}', '${data.description}', '${data.photo}')`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  updateCourseAction = async (data) => {
    let sql = `UPDATE course SET name = '${data.name}', description = '${data.description}', photo = '${data.photo}' WHERE id = ${data.id}`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };  

  deletecourse = async (data) => {
    let sql = `DELETE FROM course WHERE id ='${data.id}'`;
    console.log(sql);
    const [result, fields] = await promisePool.query(sql);
    return result;
  };    

  getcourselist = async () => {
    let sql = `SELECT * FROM course ORDER BY id DESC`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };  

  getDashboardStatistics = async (data) => {
    let sql = `SELECT 
    (select COUNT(id) from users) as totalUsers,
    (select COUNT(id) from course) as totalCourses,
    (select COUNT(id) from materials) as totalStudyMaterial`;
    const [result, fields] = await promisePool.query(sql);
    return result[0];
  };

  getUsersList = async (data) => {
    var sql = `select * from users where id ORDER BY id DESC`
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  getAdminInfo = async (data) => {
    let sql = `SELECT * FROM admin where username = '${data.username}'`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  userblock = async (data) => {
    let sql = `UPDATE users set blocked=1 WHERE id= '${data.id}'`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };
  userUnblock = async (data) => {
    let sql = `UPDATE users set blocked=0 WHERE id= '${data.id}'`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };

  changePassword = async (newPassword, admin_id) => {
    let sql = `UPDATE admin SET password = '${newPassword}' WHERE id = '${admin_id}'`;
    const [result, fields] = await promisePool.query(sql);
    return result.affectedRows;
  };

}
module.exports = new AdminModel();
