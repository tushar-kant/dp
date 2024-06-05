// UpdateStudentForm.jsx
import React, { useState } from 'react';

const UpdateStudentForm = ({ student, onUpdate, onCancel }) => {
    const [updatedData, setUpdatedData] = useState({
        name: student.name,
        age: student.age,
        class: student.class
    });

    const { name, age, class: studentClass } = updatedData;

    const handleChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedData); // Pass updated data to the parent component
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
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Update Student</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default UpdateStudentForm;
