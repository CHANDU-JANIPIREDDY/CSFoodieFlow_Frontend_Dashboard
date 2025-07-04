import React, { useState } from 'react';
import { API_PATH } from '../../data/ApiPath';

const Register = ({ showLoginHandler }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_PATH}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Vendor Registered Successfully');
        setUserName('');
        setEmail('');
        setPassword('');
        showLoginHandler(); // Redirect to login
      } else {
        alert(data.message || 'Registration failed');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Registration Failed:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form className="authFormLogin" onSubmit={handleSubmit}>
        <h4>VENDOR REGISTER</h4>

        <div className="label-container">
          <label className="label-name">USER NAME</label><br />
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            placeholder="Enter your name"
          />
        </div>

        <div className="label-container">
          <label className="label-name">EMAIL</label><br />
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="label-container">
          <label className="label-name">PASSWORD</label><br />
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
