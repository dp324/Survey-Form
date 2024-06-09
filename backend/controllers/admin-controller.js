import Admin from '../models/admin.js';
import Survey from '../models/survey.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


const jwtSecret = '123';

export const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new admin
    const newAdmin = new Admin({ userName, password: hashedPassword });
    const savedNewAdmin = await newAdmin.save();
    
    res.status(201).json(savedNewAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: admin._id, username: admin.userName }, jwtSecret, { expiresIn: '1h' });

  // Send token as cookie
  res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login successful' });
};

export const logout = async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
};


export const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const newSurvey = new Survey({ title, questions });
    const savedSurvey = await newSurvey.save();
    res.status(201).json(savedSurvey);
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

export const getAllSurveys = async (req, res) => {
  const surveys = await Survey.find();
  res.status(200).json(surveys);
};

export const deleteSurvey = async (req, res) => {
  try {
    const surveyId = req.params.id;
    await Survey.findByIdAndDelete(surveyId);
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Some error occurred!' });
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
  try {
    res.status(200).json({message : "found"});
  } catch (error) {
    console.log(error);
  }
}
