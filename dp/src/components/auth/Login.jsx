import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from './AuthContext.jsx'; // Import AuthContext


import config from '../../../config.jsx';

function Login() {
    const { login } = useContext(AuthContext); // Destructure login from AuthContext

    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Make POST request to login endpoint
            // const response = await axios.post('https://backend-pdf.onrender.com/auth/login', formData);
            const response = await axios.post(`${config.baseURL}/auth/login`, formData);

            const { token } = response.data || "hjgjgj";
            login(token);

            console.log(response.data.message); // Login successful

            setError('');

            navigate('/');
        } catch (err) {
            setError(err.response.data.message); // Invalid username or password
        }
        finally {
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>

            <div className="container mt-5 d-flex justify-content-center">
                <div className="card border-0 shadow rounded-lg overflow-hidden">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Welcome Back!</h3>
                        {/* <img src={logo} alt="Company Logo" className="img-fluid" width="100" /> */}
                    </div>
                    <div className="card-body px-5 py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <div className="d-flex align-items-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control flex-grow-1"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />


                                </div>
                            </div>

                            <div className="row">
                                <div className="form-check mb-3 col-9">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="col-3">
                                    <i
                                        className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} m-1 text-secondary cursor-pointer`}
                                        onClick={togglePasswordVisibility}
                                    ></i>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                        {error && <p className="mt-3 text-danger">{error}</p>}
                        <div className="text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                            <br />
                            <Link to="/register">Create New Account</Link>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
}

export default Login