import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../../config.jsx';

const ViewAllStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${config.baseURL}/api/students`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2 className='text-center'>All components</h2>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.class}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewAllStudents;
