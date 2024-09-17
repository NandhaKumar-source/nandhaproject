import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './signupform.css';
import user from './images/user.png';

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const initialValues = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    profilePicture: null,
    role: 'normal-user',
    hospitalId: '',
    departmentId: '',
    doctorDetails: {
      category: '',
      workExperience: '',
      location: ''
    },
    gender: '',
    dob: '',
    age: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobile: Yup.string().matches(/^[0-9]+$/, "Mobile number must be digits only").required('Mobile number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    profilePicture: Yup.mixed()
      .nullable()
      .test('fileSize', 'File size is too large', value => {
        if (value) {
          return value.size <= 2000000; // 2MB limit
        }
        return true;
      })
      .test('fileType', 'Unsupported file type', value => {
        if (value) {
          return ['image/jpeg', 'image/png'].includes(value.type);
        }
        return true;
      }).required('Your picture is required'),
    role: Yup.string().oneOf(['main-admin', 'admin', 'doctor', 'normal-user']).required('Role is required'),
    hospitalId: Yup.string().when('role', {
      is: role => role === 'admin' || role === 'doctor',
      then: Yup.string().required('Hospital ID is required')
    }),
    departmentId: Yup.string().when('role', {
      is: 'doctor',
      then: Yup.string().required('Department ID is required')
    }),
    doctorDetails: Yup.object().shape({
      category: Yup.string().when('role', {
        is: 'doctor',
        then: Yup.string().required('Category is required')
      }),
      workExperience: Yup.string().when('role', {
        is: 'doctor',
        then: Yup.string().required('Work experience is required')
      }),
      location: Yup.string().when('role', {
        is: 'doctor',
        then: Yup.string().required('Location is required')
      })
    }),
    gender: Yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
    dob: Yup.date().required('Date of birth is required'),
    age: Yup.number().min(0, 'Age cannot be negative').required('Age is required')
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('mobileNumber', values.mobile); // Corrected field name
    formData.append('password', values.password);
    formData.append('role', values.role);
    formData.append('gender', values.gender);
    formData.append('dob', values.dob);
    formData.append('age', values.age);
  
    if (values.role === 'doctor') {
      formData.append('category', values.doctorDetails.category);
      formData.append('workExperience', values.doctorDetails.workExperience);
      formData.append('location', values.doctorDetails.location);
      formData.append('hospitalId', values.hospitalId);
      formData.append('departmentId', values.departmentId);
    } else if (values.role === 'admin') {
      formData.append('hospitalId', values.hospitalId);
    }
  
    if (values.profilePicture) {
      formData.append('profilePicture', values.profilePicture);
    }
  
    try {
      const response = await fetch('http://localhost:3000/carepoint/users/signup', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="signup-form-container">
      <img src={user} alt="Profile Icon" className="profile-icon" />
      
      <div className="signup-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <div className="field-wrapper">
                <label>Signup</label>
                <div className="input-line">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="span" className="error" />
                </div>
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
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                  />
                  <ErrorMessage name="mobile" component="span" className="error" />
                </div>
                <div className="input-line">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="span" className="error" />
                </div>
                <div className="input-line">
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={(event) => {
                      formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
                    }}
                    placeholder="Profile Picture"
                  />
                  <ErrorMessage name="profilePicture" component="span" className="error" />
                </div>
                <div className="input-line1">
                  <Field as="select" name="role">
                    <option value="normal-user">Normal User</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                    <option value="main-admin">Main Admin</option>
                  </Field>
                  <ErrorMessage name="role" component="span" className="error" />
                </div>
                {formik.values.role === 'admin' || formik.values.role === 'doctor' ? (
                  <div className="input-line">
                    <Field
                      type="text"
                      name="hospitalId"
                      placeholder="Hospital ID"
                    />
                    <ErrorMessage name="hospitalId" component="span" className="error" />
                  </div>
                ) : null}
                {formik.values.role === 'doctor' ? (
                  <>
                    <div className="input-line">
                      <Field
                        type="text"
                        name="departmentId"
                        placeholder="Department ID"
                      />
                      <ErrorMessage name="departmentId" component="span" className="error" />
                    </div>
                    <div className="input-line">
                      <Field
                        type="text"
                        name="doctorDetails.category"
                        placeholder="Category"
                      />
                      <ErrorMessage name="doctorDetails.category" component="span" className="error" />
                    </div>
                    <div className="input-line">
                      <Field
                        type="text"
                        name="doctorDetails.workExperience"
                        placeholder="Work Experience"
                      />
                      <ErrorMessage name="doctorDetails.workExperience" component="span" className="error" />
                    </div>
                    <div className="input-line">
                      <Field
                        type="text"
                        name="doctorDetails.location"
                        placeholder="Location"
                      />
                      <ErrorMessage name="doctorDetails.location" component="span" className="error" />
                    </div>
                  </>
                ) : null}
                <div className="input-line1">
                  <Field as="select" name="gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="span" className="error" />
                </div>
                <div className="input-line">
                  <Field
                    type="date"
                    name="dob"
                  />
                  <ErrorMessage name="dob" component="span" className="error" />
                </div>
                <div className="input-line">
                  <Field
                    type="number"
                    name="age"
                    placeholder="Age"
                  />
                  <ErrorMessage name="age" component="span" className="error" />
                </div>
                <button type="submit" disabled={formik.isSubmitting}>
                  Signup
                </button>
                <div className="login-link">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
