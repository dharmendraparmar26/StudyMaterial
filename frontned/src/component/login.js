import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import toast, { Toaster } from 'react-hot-toast';
import { LoginAction } from '../Action/action';
import config from '../coreFIles/config';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const Login = () => {

  const [form, setForm] = useState({ email: '', password: ''})
  const [validatioError, setvalidatioError] = useState({ emailError: '', passwordError : ''});

  const inputHandler = (e) => {
    const { name, value, id } = e.target
    if (value != '') {
        setvalidatioError((old) => {
            return { ...old, [id]: '' }
        })
    }

    setForm((old) => {
      return { ...old, [name]: value }
    })
  }

  function validate() {
    let emailError = "";
    let passwordError = "";

    if (form.email === '') {
      emailError = "Email is required."
    }
    if (form.password === '') {
      passwordError = "Password is required."
    }

    if (emailError || passwordError) {
      setvalidatioError({
        emailError, passwordError
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
          Cookies.set('loginStudyMaterial', JSON.stringify(res.data));
          toast.success(res.msg);
          window.location.href = `${config.baseUrl}`
        } else {
          toast.error(res.msg);
        }
      }
  }

  return (
    <>
      <Toaster />
      <Header />
      <>
        <main id="main">
          <div className="breadcrumbs" data-aos="fade-in">
            <div className="container">
              <h2>Login</h2>
            </div>
          </div>

          <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
              <div className="row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 mt-5 mt-lg-0">
                  <form
                    className="php-email-form"
                    onSubmit={SubmitForm} autoComplete="off"
                  >
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        id='emailError'
                        onChange={inputHandler}
                      />
                      <span className="validationErr">{validatioError.emailError}</span>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter Password"
                        id='passwordError'
                        onChange={inputHandler}
                      />
                      <span className="validationErr">{validatioError.passwordError}</span>
                    </div>

                    <div className="text-center">
                      <button type="submit">Login</button>
                    </div>
                  </form>
                  
                  Don't have an account? <Link to={`${config.baseUrl}signup`} > Sign Up </Link>
                </div>
                <div className="col-lg-3"></div>

              </div>
            </div>
          </section>
          {/* End Contact Section */}
        </main>
        {/* End #main */}
      </>

      <Footer />
    </>
  )
}
export default Login;