// controllers/studentController.js
const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, age, class: studentClass } = req.body;
    try {
        const student = new Student({ name, age, class: studentClass });
        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, age, class: studentClass } = req.body;
    try {
        await Student.findByIdAndUpdate(id, { name, age, class: studentClass });
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
