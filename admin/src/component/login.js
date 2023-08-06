import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { LoginAction } from '../Action/action';
import Cookies from 'js-cookie'
import config from '../coreFIles/config';

const Login = () => {

  const [form, setForm] = useState({ username: '', password: '' });
  const [validatioError, setvalidatioError] = useState({});

  if (Cookies.get('loginStudyMaterialAdmin')) {
    window.location.href = `${config.baseUrl}dashboard`;
  }

  const inputHandler = async (e) => {
    const { name, value } = e.target
    setForm((old) => {
        return { ...old, [name]: value }
    })
  }

  function validate() {
    let usernameError = "";
    let passwordError = "";

    if (form.username === '') {
      usernameError = "Username is required."
    }
    if (form.password === '') {
        passwordError = "Password is required."
    }
    if (usernameError || passwordError) {
        setvalidatioError({
          usernameError, passwordError
        })
        return false
    } else {
        return true
    }
}

const SubmitForm = async (e) => {
    e.preventDefault()
    const isValid = validate();
    if (!isValid) {

    }
    else {
        let res = await LoginAction(form);
        if (res.success) {
            toast.success(res.msg);
            Cookies.set('loginStudyMaterialAdmin', JSON.stringify(res.data));
            setTimeout(() => {
                window.location.href = `${config.baseUrl}dashboard`;
            }, 1200);
        } else {
            toast.error(res.msg);
        }
    }
}

  return (
  
    <>
      <div class="hold-transition theme-primary bg-img ">
        <div className="container h-p100">
        <Toaster />
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-black rounded10 shadow-lg admin-login">
                    <div className="content-top-agile p-20 pb-0">
                  {/* <center class="loginLogo">
                    <img src='./images/logo.png' />
                    </center> */}
                     
                      <h2 className="text-white">Admin Panel</h2>
                      <p className="mb-0">Sign in to continue to Study Material Admin</p>
                    </div>
                    <div className="p-40">
                      <form action="" method="post">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <span className="input-group-text"><i className="ti-user" /></span>
                            <input type="text" className="form-control ps-15 " placeholder="Username" onChange={inputHandler} name="username" value={form.username} />
                          </div>
                           
                        </div>
                        <div className="form-group mb-3">
                          <div className="input-group ">
                            <span className="input-group-text"><i className="ti-lock" /></span>
                            <input type="password" className="form-control ps-15 " placeholder="Password" onChange={inputHandler} name="password" value={form.password} />
                          </div>
                            <span className="validationErr">{validatioError.passwordError}</span>
                        </div>
                        <div className="row">
                         
                          <div className="col-12 text-center">
                            <button type="submit" onClick={SubmitForm} className="btn btn-primary mt-10">SIGN IN</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )

}
export default Login;