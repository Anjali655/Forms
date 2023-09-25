import { useState } from "react";
import React from "react";

const Controlled = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      validationErrors.username = "Username should be at least 3 characters";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Password not matched";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setSubmittedData(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <section className="wrapper">
      {submittedData ? (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <pre>{submittedData}</pre>
        </div>
      ) : (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Controlled Form</h1>
            <div className="line"></div>
            <form noValidate onSubmit={handleSubmit}>
              <div style={{ width: "100%" }}>
                <div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your name"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  {errors.username && <span style={{color:"red"}}>{errors.username}</span>}
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  {errors.email && <span  style={{color:"red"}}>{errors.email}</span>}
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password "
                    onChange={handleChange}
                  />
                  {errors.password && <span  style={{color:"red"}}>{errors.password}</span>}
                </div>
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span  style={{color:"red"}}>{errors.confirmPassword}</span>}
                </div>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Controlled;