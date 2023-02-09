import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';
import { loginUser } from '../../pages/redux/actions/login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from '../../components/Navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginData = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    Swal.fire('Success', 'Login success', 'success');
    dispatch(loginUser(data, navigate));
  };

  return (
    <div className="container">
      <Navigation />
      <div align="center">
        <h3 className="mt-4">Please login with your account</h3>
        <form onSubmit={loginData}>
          <div className="col-md-4 mt-4">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email"
                aria-label="Email"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <button className="btn btn-primary mb-4" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
