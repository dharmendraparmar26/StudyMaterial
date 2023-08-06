import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import toast, { Toaster } from 'react-hot-toast';
import { RegisterAction } from '../Action/action';
import config from '../coreFIles/config';
import { Link } from 'react-router-dom';
const Signup = () => {

  const [form, setForm] = useState({ first_name : '', last_name : '', email: '', password: '', confirm_password: '', bio: ''})
  const [validatioError, setvalidatioError] = useState({ firstNameError: '', lastNameError: '', emailError: '', passwordError : '', confirmPasswordError : ''  });

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
    let confirmPasswordError = "";
    let firstNameError = "";

    if (form.email === '') {
      emailError = "Email is required."
    }
    if (form.password === '') {
      passwordError = "Password is required."
    }
    if (form.confirm_password === '') {
      confirmPasswordError = "Confirm password is required."
    }
    if (form.password != form.confirm_password && (form.password && form.confirm_password)) {
      confirmPasswordError = "Password and confirm password does not match."
    }
    if (form.first_name === '') {
      firstNameError = "First name required."
    }

    if (emailError || passwordError || confirmPasswordError || firstNameError) {
      setvalidatioError({
        emailError, passwordError, confirmPasswordError, firstNameError
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
        let res = await RegisterAction(form);
        if (res.success) {
          toast.success(res.msg);
          setTimeout(() => {
            window.location.href = `${config.baseUrl}login`
          }, 2000);
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
              <h2>Sign Up</h2>
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
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          placeholder="Your First Name"
                          id='firstNameError'
                          onChange={inputHandler}
                        />
                        <span className="validationErr">{validatioError.firstNameError}</span>
                      </div>
                      <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          placeholder="Your Last Name"
                          onChange={inputHandler}
                        />
                      </div>
                    </div>
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

                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        name="confirm_password"
                        placeholder="Enter Confirm Password"
                        id='confirmPasswordError'
                        onChange={inputHandler}
                      />
                      <span className="validationErr">{validatioError.confirmPasswordError}</span>
                    </div>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="bio"
                        rows={5}
                        placeholder="Enter Your Bio"
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                  Already have an account? <Link to={`${config.baseUrl}login`} > Login </Link>
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
export default Signup;