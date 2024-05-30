import React from 'react'

const RegisterPage = () => {
  return (
    <div className='register'>
      <div className='register_content'>
        <form action="">
          <input type="text" placeholder='First Name' name='firstName' required/>
          <input type="text" placeholder='Last Name' name='LastName' required/>
          <input type="email" placeholder='Email' name='email'  required/>
          <input type="password" placeholder='Password' name='password' required/>
          <input type="password" placeholder='Confirm Password' name='confirmPasword' required/>
          <input type="file" name='profileImage' accept='image/*' required/>
          <label htmlFor="">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload your profile photo</p>
          </label>
        </form>
        <a href="/login">Already have an account? Login In From Here</a>
      </div>
    </div>
  )
}

export default RegisterPage