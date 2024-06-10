import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthApiCall } from "../../service/useAuthApiCall";





function SignUpForm() {
  const {signUp}=useAuthApiCall()
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUpSchema = Yup.object().shape({
    userName: Yup.string()
      .required("username is required"),
    email: Yup.string()
      .required("email is required")
      .test("email", "your email is not valid", value => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    password: Yup.string()
      .required("password is required")
      .test("password", "Password must be at least 6 characters long and include a capital letter", value => {
        const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
        return passwordRegex.test(value);
      })
  });

  return (
    <div className="form-container sign-up-container">
      <Formik
        initialValues={{ userName: "", email: "", password: "" }}
        validationSchema={signUpSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { userName, email, password } = values;

          const payload = { userName, email, password };
          console.log(payload);
           signUp(payload)
           setSubmitting(false)
           resetForm()
        }}
      >
        {({ isSubmitting, errors, touched ,handleBlur}) => (
          <Form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <div>
              <Field
                type="text"
                name="userName"
                placeholder="Username"
                onBlur={handleBlur}
                className={errors.userName && touched.userName ? "error" : ""}
              />
              <ErrorMessage name="userName" component="div" className="error" />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "error" : ""}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="password-field">
              <div className="password-input-wrapper">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
                />
                <i
                  type="button"
                  onClick={toggleShowPassword}
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                />
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;

