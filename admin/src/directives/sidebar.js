import React, { useEffect, useState } from "react";
import config from "../coreFIles/config";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [isActive, setActive] = useState('');
  const [pageUrl, setPageUrl] = useState(window.location.href);
  const logout = async () => {
    Cookies.remove('loginStudyMaterialAdmin');
    window.location.href = config.baseUrl;
  }

  const toggleClass = (type) => {
    if (type == isActive) {
      setActive('');
    } else {
      setActive(type);
    }
  };

  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="multinav mt-15">
            <div className="multinav-scroll" style={{ height: "100%" }}>
              <ul className="sidebar-menu" data-widget="tree">
                <li className={pageUrl.match("/dashboard") ? "active" : ""}>
                  <a href={`${config.baseUrl}dashboard`}>
                    <i data-feather="home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li
                  className={
                    pageUrl.match("/users")
                      ? "active"
                      : ""
                  }
                >
                  <a href={`${config.baseUrl}users`}>
                    <i data-feather="user" />
                    <span>Users</span>
                  </a>
                </li>

                <li className={pageUrl.match("/courseManagement") ? "active" : ""}>
                  <a href={`${config.baseUrl}courseManagement`}>
                    <i data-feather="radio" />
                    <span>Course Management</span>
                  </a>
                </li>

                <li className={pageUrl.match("/materials") ? "active" : ""}>
                  <a href={`${config.baseUrl}materials`}>
                    <i data-feather="radio" />
                    <span>Post Material</span>
                  </a>
                </li>

                <li className={pageUrl.match("/changepassword") ? "active" : ""}>
                  <a href={`${config.baseUrl}changepassword`}>
                    <i data-feather="radio" />
                    <span>Change Password</span>
                  </a>
                </li>                           
                
                <li className="">
                  <a href="javascript:;" onClick={logout}>
                    <i data-feather="log-out" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};
export default Sidebar;
