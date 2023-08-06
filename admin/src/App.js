import "./App.css";
import React, { } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from "./coreFIles/config";
import AdminLogin from "./component/login";
import Dashboard from "./component/dashboard";
import Users from "./component/users";
import Changepassword from "./component/changepassword";
import Materials from "./component/materials";
import Addmaterial from "./component/addmaterial";
import CourseManagement from "./component/courseManagement";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={`${config.baseUrl}adminLogin`} element={<AdminLogin />} />
          <Route path={`${config.baseUrl}dashboard`} element={<Dashboard />} />
          <Route path={`${config.baseUrl}users`} element={<Users />} />
          <Route path={`${config.baseUrl}changepassword`} element={<Changepassword />} />
          <Route path={`${config.baseUrl}materials`} element={<Materials />} />
          <Route path={`${config.baseUrl}addmaterial`} element={<Addmaterial />} />
          <Route path={`${config.baseUrl}courseManagement`} element={<CourseManagement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
