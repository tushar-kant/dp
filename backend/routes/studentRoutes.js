// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Delete a student
router.delete('/:id', studentController.deleteStudent);

// Update a student
router.put('/:id', studentController.updateStudent);

module.exports = router;
