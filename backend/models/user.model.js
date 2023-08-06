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

class UserModel {

  getUsersDetails = async (email) => {
    let sql = `SELECT * FROM users where email = '${email}'`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  }

  saveUserDetails = async (userDetails) => {
    let sql = `INSERT INTO users(
      first_name,
      last_name,
      email, 
      password,
      bio
      ) VALUES(
          '${userDetails.first_name}',
          '${userDetails.last_name}',
          '${userDetails.email}', 
          '${userDetails.password}', 
          '${userDetails.bio}'
          )`;
    const [result, fields] = await promisePool.query(sql);
    return result.insertId;
  }

  getstatistics = async () => {
    let sql = `SELECT COUNT(id) as totalStudents, (SELECT COUNT(id) FROM course) as totalCourse, (SELECT COUNT(id) FROM materials) as totalStudyMaterial FROM users`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  }

  getCourses = async () => {
    let sql = `SELECT * FROM course`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  }  

  getCoursesMaterials = async (data) => {
    let sql = `SELECT materials.*, course.name as course_name FROM materials LEFT JOIN course ON materials.course_id = course.id WHERE 1`;

    if(data.courseType){
      sql = sql+ ` AND course_id = ${data.courseType}`
    }

    if(data.year){
      sql = sql+ ` AND year = ${data.year}`
    }    

    const [result, fields] = await promisePool.query(sql);
    return result;
  }    

    addcontactRequest = async (data) => {
        let sql = `INSERT INTO contact_us(name, email, phone, subject, message) VALUES('${data.name}', '${data.email}', '${data.phone}', '${data.subject}', '${data.message}')`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }  

}
module.exports = new UserModel();
