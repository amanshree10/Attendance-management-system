const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const PORT = 3500;

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin',
    database: 'sms'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create table if not exists
const createTableQuery = `CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_no INT NOT NULL,
    adm VARCHAR(100) NOT NULL,
    CITY VARCHAR (100) NOT NULL
)`;

connection.query(createTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

// Use the cors middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Fetch student data from the database
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.status(200).json(results);
        }
    });
});

// Handle form submissions
app.post('/submit', (req, res) => {

    console.log(req.body);

    
    const { name, number, city, rollNo } = req.body;
    const insertQuery = `INSERT INTO students (name, adm_no, city, roll_no) VALUES (?, ?, ?, ?)`;
    connection.query(insertQuery, [name, number, city, rollNo], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error saving data' }); // Return error message as JSON
        } else {
            res.status(200).json({ message: 'Data saved successfully' }); // Return success message as JSON
        }
    });
});

// Endpoint to update student status
app.post('/updateStatus', (req, res) => {
    console.log(req.body, 'line 82');
    const { studentId } = req.body;
    const { status } = req.body;
 


    const updateQuery = `UPDATE students SET attendance_status = ? WHERE id = ?`;
    connection.query(updateQuery, [status, studentId], (err, results) => {
        if (err) {
            console.error('Error updating status:', err);
            
            res.status(500).json({ message: 'Error updating status' });
        } else {
            console.log('Status updated successfully');
            res.status(200).json({ message: 'Status updated successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});