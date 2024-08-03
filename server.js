const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

app.use (bodyParser.urlencoded({extended: true}));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://roshh1601:ITSROSH37@cluster0.ssi208o.mongodb.net/studentportal", 
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
} 
);

// Serve static files from the "public" directory
app.use('/public', express.static('public'));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/faculty', express.static(path.join(__dirname, 'faculty')));
app.use('/student', express.static(path.join(__dirname, 'student')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'ahome.html', 'achievement.html', 'add-user.html', 'profile.html'));
});

app.get('/faculty-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

//create a data schema

const adminSchema = new mongoose.Schema(
  {
    adminName: String,
    adminLastName: String,
    adminEmail: String,
    adminDepartment: String,
    adminPassword: String,
  }
);

const facultySchema = new mongoose.Schema({
  facultyName: String,
  facultyLastName: String,
  facultyEmail: String,
  facultyDepartment: String,
  facultyPassword: String,
});

const Admin = mongoose.model("Admin", adminSchema);
const Faculty = mongoose.model("Faculty", facultySchema);

app.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  // Validate the provided email and password
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Find an admin with the provided email and password
  Admin.findOne({ adminEmail: email, adminPassword: password })
    .then((admin) => {
      if (admin) {
        // Credentials are valid
        res.redirect('/admin/ahome.html'); // Redirect to the admin home page
      } else {
        // Credentials are invalid
        res.status(401).send('Invalid credentials'); // Send an error message
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});



app.post('/faculty-login', (req, res) => {
  const { email, password } = req.body;

  // Validate faculty credentials by checking the database
  Faculty.findOne({ facultyEmail: email, facultyPassword: password })
    .then((faculty) => {
      if (faculty) {
        // Credentials are valid
        res.redirect('/faculty/fhome.html'); // Redirect to the faculty home page
      } else {
        // Credentials are invalid
        res.status(401).send('Invalid faculty credentials'); // Send an error message
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/student-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const studentSchema = new mongoose.Schema(
  {
    studentName: String,
    studentLastName: String,
    studentDivision: String,
    studentRollNo: String,
    studentEmail: String,
    studentDepartment: String,
    studentPassword: String,
  }
);

const Student = mongoose.model("Student", studentSchema);

app.post('/student-login', (req, res) => {
  const { email, password } = req.body;

  // Validate student credentials by checking the database
  Student.findOne({ studentEmail: email, studentPassword: password })
    .then((student) => {
      if (student) {
        // Credentials are valid
        res.redirect('/student/shome.html'); // Redirect to the student home page
      } else {
        // Credentials are invalid
        res.status(401).send('Invalid student credentials'); // Send an error message
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/logout', (req, res) => {
  // Redirect to the home page (http://localhost:3000)
  res.redirect('http://localhost:3000');
});

 
app.post("/admin", function(req, res) {
  let newAdmin = new Admin({
    adminName: req.body.adminName,
    adminLastName: req.body.adminLastName,
    adminEmail: req.body.adminEmail,
    adminDepartment: req.body.adminDepartment,
    adminPassword: req.body.adminPassword
  });
  newAdmin.save()
    .then(() => {
      res.json({ message: 'Admin created Successfully'});
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});


app.post("/faculty", function(req, res) {
  let newFaculty = new Faculty({
    facultyName: req.body.facultyName,
    facultyLastName: req.body.facultyLastName,
    facultyEmail: req.body.facultyEmail,
    facultyDepartment: req.body.facultyDepartment,
    facultyPassword: req.body.facultyPassword
  });
  newFaculty.save()
    .then(() => {
      res.json({ message: 'Admin created Successfully'});
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.post("/student", function(req, res) {
  let newStudent = new Student({
    studentName: req.body.studentName,
    studentLastName: req.body.studentLastName,
    studentDivision: req.body.studentDivision,
    studentRollNo: req.body.studentRollNo,
    studentEmail: req.body.studentEmail,
    studentDepartment: req.body.studentDepartment,
    studentPassword: req.body.studentPassword
  });
  newStudent.save()
  .then(() => {
    res.json({ message: 'Admin created Successfully'});
  })
  .catch(err => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/api/admins', async (req, res) => {
  try {
    const admins = await Admin.find(); // Fetch all admin documents
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Add this route to your server code
app.get('/api/faculties', async (req, res) => {
  try {
    const faculties = await Faculty.find(); // Fetch all faculty documents
    res.json(faculties);
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    res.status(500).json({ error: 'An error occurred while fetching faculty data' });
  }
});

// Add this route to your server code
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all faculty documents
    res.json(students);
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'An error occurred while fetching student data' });
  }
});
// Serve static files from the "admin" directory
app.use(express.static('admin'));


// API endpoint to delete an admin user by ID
app.delete('/api/admins/:id', async (req, res) => {
  const adminId = req.params.id;
  try {
    const result = await Admin.findByIdAndDelete(adminId);
    if (result) {
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to delete an admin user by ID
app.delete('/api/faculties/:id', async (req, res) => {
  const facultyId = req.params.id;
  try {
    const result = await Faculty.findByIdAndDelete(facultyId);
    if (result) {
      res.json({ message: 'Faculty deleted successfully' });
    } else {
      res.status(404).json({ error: 'Faculty not found' });
    }
  } catch (error) {
    console.error('Error deleting Faculty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to delete an admin user by ID
app.delete('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const result = await Student.findByIdAndDelete(studentId);
    if (result) {
      res.json({ message: 'student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to render viewadmin.html
app.get('/viewadmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'viewadmin.html'));
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});