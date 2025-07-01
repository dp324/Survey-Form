import Admin from '../models/admin.js';
import Survey from '../models/survey.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();


const jwtSecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username: username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(username);
  const admin = await Admin.findOne({ username });  
  //console.log(admin);
  if (!admin) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ id: admin._id, username: admin.username }, jwtSecret, { expiresIn: '1h' });
  //console.log(token);
  // Send token as cookie
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: true, // Set to true if using HTTPS
    sameSite: 'None', // Set to 'None' for cross-site cookies
  }).status(200).json({ message: 'Login successful' });
};

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true, // Use true if using HTTPS
    sameSite: 'None', // Set to 'None' for cross-site cookies
  }).status(200).json({ message: 'Logout successful' });
};

export const createSurvey = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const adminId = req.user.id;   
    const newSurvey = new Survey({
      title,
      description,
      questions,
      admin: adminId
    });

    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSurveys = async (req, res) => {
  const adminId = req.user.id; 

  try {
      const surveys = await Survey.find({ admin: adminId });
      res.status(200).json(surveys);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

export const deleteSurvey = async (req, res) => {
  const adminId = req.user.id;
  const admin = await Admin.findById(adminId);
  const { password } = req.body;
  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  else{
    try {
      const surveyId = req.params.id;
      await Survey.findByIdAndDelete(surveyId);
      res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Some error occurred!' });
    }
  }
};

export const surveyInfo = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {   
      const survey = await Survey.findById(id);
      if(!survey){
          return res.status(404).json({ error: 'Survey not found' });
      }
      res.status(200).json(survey);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const checkLogin = (req, res) => {
  if (req.user) {
    return res.json({ username: req.user.username });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

