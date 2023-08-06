import {
  getRequest,
  postRequest,
  postRequestFormData,
} from "../coreFIles/helper";

export const RegisterAction = (data) => {
  return postRequest("userRegister", data).then((res) => {
    return res.data;
  });
};

export const LoginAction = (data) => {
  return postRequest("login", data).then((res) => {
    return res.data;
  });
};

export const statisticsAction = (data) => {
  return getRequest("getstatistics", data).then((res) => {
    return res.data;
  });
};

export const coursesAction = (data) => {
  return getRequest("getCourses", data).then((res) => {
    return res.data;
  });
};

export const coursesMaterialDataAction = (data) => {
  return postRequest("getCoursesMaterials", data).then((res) => {
    return res.data;
  });
};