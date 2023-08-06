import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie'
import {getprofileidAction } from '../Action/action';
const Header = () => {
  
  const loginData = (!Cookies.get('loginStudyMaterialAdmin')) ? [] : JSON.parse(Cookies.get('loginStudyMaterialAdmin'));
    if (!loginData || loginData == '') {
      window.location.href = `${config.baseUrl}`;
    }

    const [ProfileList, setProfileList] = useState([]);

    useEffect(() => {
      getProfiledetailsbyid();
    }, []);
 
    const getProfiledetailsbyid = async () => {
      let res = await getprofileidAction({ id:loginData.id });
      if (res.success) {
        setProfileList(res.data);
      }
    };

  const logout = async () => {
    Cookies.remove('loginStudyMaterialAdmin');
    window.location.href = config.baseUrl;
}

    return (
        <>
            <header className="main-header">
            <div className="d-flex align-items-center logo-box justify-content-start">
                  &nbsp;&nbsp;&nbsp;<h2 className='headerLogo'>Study Material</h2>
            </div>
            <nav className="navbar navbar-static-top">
              <div className="app-menu">
                <ul className="header-megamenu nav">
                  <li className="btn-group nav-item">
                    {/* <a
                      href="#"
                      className="waves-effect waves-light nav-link push-btn btn-primary-light"
                      data-toggle="push-menu"
                      role="button"
                    >
                      <i data-feather="align-left" />
                    </a> */}
                  </li>
                </ul>
              </div>
              <div className="navbar-custom-menu r-side">
                <ul className="nav navbar-nav">
                  <li className="dropdown user user-menu">
                    <a
                      href="#"
                      className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                      data-bs-toggle="dropdown"
                      title="User"
                    >
                      <div className="d-flex pt-5">
                        <div className="text-end me-10">
                          <p className="pt-5 fs-14 mb-0 fw-700 text-white">{loginData.username}</p>
                          <small className="fs-10 mb-0 text-uppercase text-mute">
                            Admin
                          </small>
                        </div>                      
                      </div>
                    </a>
                    <ul className="dropdown-menu animated flipInX">
                      <li className="user-body">
                        <a className="dropdown-item" href="javascript:;" onClick={logout}>
                          <i className="ti-lock text-muted me-2" /> Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </>
    )
}
export default Header;