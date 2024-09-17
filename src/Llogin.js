import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './loginform.css';
import user from './images/user.png'; // Correctly import the image

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      // Make POST request to login API
      const response = await fetch('http://localhost:3000/carepoint/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      // Handle response
      if (response.ok) {
        // Assuming login is successful and response contains token and user data
        const { token, msg } = await response.json();

        // Store the token in localStorage or another secure place
        localStorage.setItem('authToken', token);

        // Navigate to home page
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.msg);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-form-container">
      <img src={user} alt="Profile Icon" className="profile-icon" />
      <div className="login-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <div className="field-wrapper">
                <label>Login</label>
                <div className="input-line">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="span" className="error" />
                </div>
                <div className="input-line">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="span" className="error" />
                </div>
              </div>
              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
        <div className="create-account">
          <p>Don't have an account? <a href="/signup">Create New Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
