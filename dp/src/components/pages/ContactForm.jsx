import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config.jsx';
import Navbar from './Header/Navbar.jsx';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const { name, email, message } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.baseURL}/contact`, formData);
            setSubmitted(true);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Contact Us</h4>
                            </div>
                            <div className="card-body">
                                {submitted ? (
                                    <div className="alert alert-success" role="alert">
                                        Thank you for contacting us!
                                    </div>
                                ) : (
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                value={message}
                                                onChange={onChange}
                                                required
                                                rows="4"
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;
