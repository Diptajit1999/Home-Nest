import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [matchedPassword, setMatchedPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  useEffect(() => {
    setMatchedPassword(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("https://homenest-backend.onrender.com/auth/register", {
        method: "POST",
        body: registerForm,
      });
      
      if (response.ok) {
        navigate("/login");
      } else if (response.status === 409) {
        setErrorMessage("Email already in use. Please use a different email.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Registration Failed", error.message);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!matchedPassword && (
            <p style={{ color: "red" }}>Password is not matching</p>
          )}
          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload your profile photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile Photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!matchedPassword}>
            Register
          </button>
        </form>
        <a href="/login">Already have an account? Login In From Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
