import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthApiCall} from "../../service/useAuthApiCall";
import {Link} from 'react-router-dom'

function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn } = useAuthApiCall();


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = Yup.object().shape({
    identifier: Yup.string()
      .required("Email or Username is required")
      .test("identifier", "Invalid email format or username", (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }),
    password: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="form-container sign-in-container">
      <Formik
        initialValues={{ identifier: "", password: "", rememberMe: false }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { identifier, password, rememberMe } = values;

          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          let payload = {};

          if (emailRegex.test(identifier)) {
            payload = { email: identifier, userName: "", password, rememberMe };
          } else {
            payload = { email: "", userName: identifier, password, rememberMe };
          }

          console.log(payload);
          signIn(payload)
          setSubmitting(false)
          resetForm()
          
          
        }}
      >
        {({ handleChange, values, isSubmitting, errors, touched ,handleBlur }) => (
          <Form>
            <h1>Sign in</h1>
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
            <span>or use your account</span>
            <div>
              <Field
                type="text"
                placeholder="Email or Username"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.identifier && touched.identifier ? "error" : ""
                }
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="error"
              />
            </div>
            <div className="password-field">
              <div className="password-input-wrapper">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={handleBlur}
                  placeholder="Password"
                  className={errors.password && touched.password ? "error" : ""}
                />
                <i
                  type="button"
                  onClick={toggleShowPassword}
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="remember-me">
              <Field type="checkbox" name="rememberMe" />
              <label htmlFor="rememberMe">Remember?</label>
            </div>
            <Link to='/reset'>Forgot your password?</Link>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignInForm;
