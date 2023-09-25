import React, { useRef, useState } from 'react';

function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const errors = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access form element values via refs
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Custom validation logic
    for (const field in errors) {
      errors[field] = '';
    }

    if (username.trim() === '') {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    } else if (username.length > 20) {
      errors.username = 'Username must be not more than 20characters ';
    }


    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (password.trim() === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    for (const field in errors) {
      const errorElement = document.getElementById(`error-${field}`);
      console.log('errro', errorElement)
      if (errors[field]) {
        errorElement.innerText = errors[field];
      } else {
        errorElement.innerText = '';
      }
    }

    if (Object.values(errors).every((error) => !error)) {
      const formData = { username, email, password, confirmPassword };
      setSubmittedData(JSON.stringify(formData, null, 2));
      clearFormFields();
    }
  };

  const clearFormFields = () => {
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';
  };


  return (
    <>
      {submittedData ? (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <pre>{submittedData}</pre>
        </div>
      ) : (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Uncontrolled Form</h1>
            <div className="line"></div>
            <form noValidate className="registration" onSubmit={handleSubmit}>
              <div style={{ width: "100%" }}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    ref={usernameRef}
                  />
                  <div id="error-username" className="error"></div>
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    ref={emailRef}
                  />
                  <div id="error-email" className="error"></div>
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <div id="error-password" className="error"></div>
                </div>

                <div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  ref={confirmPasswordRef}
                />
                 <div id="error-confirmPassword" className="error"></div>
                </div>
                
              </div>
              <input type="submit" value="Submit" />
            </form>

          </div>
        </div>
      )
}
    </>
  );

}

export default UncontrolledForm;