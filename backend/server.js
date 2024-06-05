    const express = require('express');
    const multer = require('multer');
    const pdf = require('pdf-parse');
    const cors = require('cors');
    const { log } = require('console');
    const bodyParser = require('body-parser');
    const crypto = require('crypto');
    const nodemailer = require('nodemailer');
    const ExcelJS = require('exceljs');  // Add this line to import ExcelJS


    const User = require('./models/user');
    const File = require('./models/file');

    const connectDB = require('./config/database');
    const authRoutes = require('./routes/authRoutes');
    const fileRoutes = require('./routes/fileRoutes');
    const studentRoutes = require('./routes/studentRoutes');
    const imageRoutes = require('./routes/imageRoutes');


    require('dotenv').config(); // Load environment variables from .env file
    // Connect to MongoDB
    connectDB();
    const app = express();
    const port = process.env.PORT || 3030;
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());


    // Multer storage configuration for handling file uploads
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });


    app.get("/", (req, res) => {
        res.send("Hello ,its working");
    });
    app.use('/auth', authRoutes);
    app.use('/file', fileRoutes);
    app.use('/api/students', studentRoutes);
    app.use('/api/images', imageRoutes);

    app.use('/contact', require('./routes/contact'));


    // Start the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });


