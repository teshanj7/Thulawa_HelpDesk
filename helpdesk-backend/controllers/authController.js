const Admin = require('../models/admin');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Checking whether the same email has been used in each userType
const checkEmailExists = async (email) => {
    const admin = await Admin.findOne({ Email: email });
    const student = await Student.findOne({ Email: email });
  
    return admin || student;
};

// Create an admin account
const adminRegister = async (req, res) => {
    try {
      const { Adminname, Email, AdminType, Password } = req.body;
      if (!Adminname || !Email || !AdminType || !Password) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const existingEmail = await checkEmailExists(Email);
      if (existingEmail) {
        return res.json({ message: 'This email already exists' });
      }

      const hashPassword = await bcrypt.hash(Password, 10);
      const admin = new Admin({ Adminname, Email, AdminType, Password: hashPassword });

      const token = jwt.sign({ _id: admin._id }, 'secretkey123', { expiresIn: '60d' });

      await admin.save();
      return res.json({ message: 'Admin registration successful', token });
    } catch (error) {
      return res.status(500).json({ error: 'Admin registration failed', details: error.message });
    }
};

// Registering a new student
const registerStudent =  async (req, res) => {
  try {
    const {Fullname, Email, RegistrationNo, Faculty, Year, StudentType, Status, Password } = req.body;
    if (!Fullname || !Email || !RegistrationNo || !Faculty || !Year || !StudentType || !Status || !Password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const existingEmail = await checkEmailExists(Email);
    if (existingEmail) {
      return res.json({ message: 'This email already exists' });
    }
  
    const hashPassword = await bcrypt.hash(Password,10);
    const student = new Student({Fullname,Email,RegistrationNo,Faculty,Year,StudentType,Status,Password: hashPassword,});
      
    const token = jwt.sign({_id: student._id}, 'secretkey123',{expiresIn: '60d',});
  
    await student.save();
    res.json({ message: 'Student registration successful', token});
  } catch (error) {
    return res.status(500).json({ error: 'Student registration failed', details: error.message});
  }
}

// Login Part base on the Type
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
      let user;
      let loginmessage;
      let type;
      
    const admin = await Admin.findOne({ Email });
    if (admin) {
      user = admin;
      loginmessage = "Admin logging successfully...!";
      type = 'admin';
    } else {
      const student = await Student.findOne({ Email });
      if (student) {
        user = student;
        loginmessage = "Student logging in successfully...!";
        type = 'student';
      } else{
        return res.status(404).json({ error: "Email not found" });
      }
    }
    
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    
    if (passwordMatch) { 
      const token = jwt.sign({ email: user.Email, type: user.UserType }, "Your_Secret_Token", { expiresIn: '1h' });
      return res.status(200).json({ message: loginmessage, token, user, type });
    } else {
      return res.status(401).json({ error: "Password incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { adminRegister, registerStudent, loginUser };