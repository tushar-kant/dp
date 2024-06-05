    // StudentTable.jsx (continued)
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import config from '../../../../config.jsx';
    import AddStudentForm from './AddStudentForm.jsx';
    import UpdateStudentForm from './UpdateStudentForm.jsx';

    const StudentTable = () => {
        const [students, setStudents] = useState([]);
        const [showAddForm, setShowAddForm] = useState(false);
        const [selectedStudent, setSelectedStudent] = useState(null);

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

        const handleDelete = async (id) => {
            try {
                await axios.delete(`${config.baseURL}/api/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('An error occurred while deleting student.');
            }
        };

        const handleUpdate = (id) => {
            const studentToUpdate = students.find(student => student._id === id);
            setSelectedStudent(studentToUpdate);
        };

        const handleAddFormToggle = () => {
            setShowAddForm(!showAddForm);
        };

    // StudentTable.jsx (continued)
    const handleAddStudent = async (newStudentData) => {
        try {
            const response = await axios.post(`${config.baseURL}/api/students`, newStudentData);
            console.log('Add student response:', response.data); // Log response data for debugging
            setStudents([...students, response.data]); // Add new student to the state
            setShowAddForm(false); // Hide the add form
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
            alert('An error occurred while adding student.');
        }
    };




    const handleUpdateStudent = async (updatedStudentData) => {
        try {
            const response = await axios.put(`${config.baseURL}/api/students/${selectedStudent._id}`, updatedStudentData);
            console.log('Update student response:', response.data); // Log response data for debugging
            fetchStudents(); // Fetch updated student list
            setSelectedStudent(null); // Clear selected student
        } catch (error) {
            console.error('Error updating student:', error);
            alert('An error occurred while updating student.');
        }
    };

        return (
            <div className="container mt-5">
                <div className="row mb-3">
                    <div className="col text-end">
                        <button className="btn btn-primary" onClick={handleAddFormToggle}>Add Student</button>
                    </div>
                </div>
                {showAddForm && (
                    <div className="row mb-3">
                        <div className="col">
                            <h5>Add Student</h5>
                            <AddStudentForm onAdd={handleAddStudent} />
                        </div>
                    </div>
                )}
                {selectedStudent && (
                    <div className="row mb-3">
                        <div className="col">
                            <h5>Update Student</h5>
                            <UpdateStudentForm 
                                student={selectedStudent} 
                                onUpdate={handleUpdateStudent} 
                                onCancel={() => setSelectedStudent(null)} 
                            />
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Class</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student._id}>
                                        <td>{student.name}</td>
                                        <td>{student.age}</td>
                                        <td>{student.class}</td>
                                        <td>
                                            <button className="btn btn-danger me-2" onClick={() => handleDelete(student._id)}>Delete</button>
                                            <button className="btn btn-warning" onClick={() => handleUpdate(student._id)}>Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    export default StudentTable;
