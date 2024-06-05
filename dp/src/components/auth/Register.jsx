import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import config from '../../../config.jsx';





function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility



    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            // Make POST request to registration endpoint
            // const response = await axios.post('https://backend-pdf.onrender.com/auth/register', formData);
            const response = await axios.post(`${config.baseURL}/auth/register`, formData);
            setSuccessMessage(response.data.message);
            setError('');
            // Clear form fields after successful registration
            setFormData({ username: '', email: '', password: '' });
        } catch (err) {
            setError(err.response.data.error);
            setSuccessMessage('');
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
                <div className="card border-0 shadow rounded-lg overflow-hidden "> {/* Enhanced design */}
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Welcome!</h3>
                        {/* <img src="path/to/your/logo.png" alt="Company Logo" className="img-fluid" width="100" /> */}
                    </div>
                    <div className="card-body px-5 py-4"> {/* Improved padding */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4"> {/* Added spacing */}
                                <label htmlFor="username">Username:</label>
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
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password:</label>
                                <div className="d-flex align-items-center"> {/* Password toggle */}
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control flex-grow-1"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i
                                        className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} m-1 text-secondary cursor-pointer`}
                                        onClick={togglePasswordVisibility}
                                    ></i>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Register
                            </button>
                        </form>
                        {error && <p className="mt-3 text-danger">{error}</p>}
                        {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                        <p className="mt-4 text-center">
                            Already have an account? <Link to="/login" className="text-dark">Login Here</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register