import {
  getRequest,
  postRequest,
  postRequestFormData,
} from "../coreFIles/helper";

export const LoginAction = (data) => {
  return postRequest("adminLogin", data).then((res) => {
    return res.data;
  });
};

export const insertMaterialAction = (data) => {
  return postRequestFormData("insertMaterial", data).then((res) => {
    return res.data;
  });
};

export const getcourselistAction = (data) => {
  return postRequest("getcourselist", data).then((res) => {
    return res.data;
  });
};

export const changePasswordAction = (data) => {
  return postRequest("changePassword", data).then((res) => {
    return res.data;
  });
};

export const deletecourseAction = (data) => {
  return postRequest("deletecourse", data).then((res) => {
    return res.data;
  });
};

export const insertCourseAction = (data) => {
  return postRequestFormData("insertCourseAction", data).then((res) => {
    return res.data;
  });
};

export const getDashboardStatisticsAction = (data) => {
  return postRequest("getDashboardStatistics", data).then((res) => {
    return res.data;
  });
};

export const getMaterialsListAction = (data) => {
  return getRequest("getMaterialsList", data).then((res) => {
    return res.data;
  });
};

export const getProfileAdminidAction = (data) => {
  return postRequest("getadminprofile", data).then((res) => {
    return res.data;
  });
};

export const updateprofileadminAction = (data) => {
  return postRequestFormData("UpdateAdminProfile", data).then((res) => {
    return res.data;
  });
};

export const getUsersListAction = (data) => {
  return postRequest("getUsersList", data).then((res) => {
    return res.data;
  });
};

export const UserBlockAction = (data) => {
  return postRequest("userblock", data).then((res) => {
    return res.data;
  });
};
export const UserUnBlockAction = (data) => {
  return postRequest("userUnblock", data).then((res) => {
    return res.data;
  });
};

export const getprofileidAction = (data) => {
  return postRequest("getadminprofile", data).then((res) => {
    return res.data;
  });
};