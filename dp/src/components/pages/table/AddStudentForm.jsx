import React, { useState } from 'react';

const AddStudentForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        class: ''
    });

    const { name, age, class: studentClass } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData); // Pass form data to the parent component
        setFormData({ // Reset form data after submitting
            name: '',
            age: '',
            class: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" name="age" value={age} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="class" className="form-label">Class</label>
                <input type="text" className="form-control" id="class" name="class" value={studentClass} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Student</button>
        </form>
    );
};

export default AddStudentForm;
