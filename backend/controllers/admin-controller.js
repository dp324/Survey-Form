import Admin from '../models/admin.js';
import Survey from '../models/survey.js';


export const signup = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const newAdmin = new Admin({userName, password});
        const savedNewAdmin = await newAdmin.save();
        res.status(201).json(savedNewAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

let currentSession = null;

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || admin.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Store session
  currentSession = { id: admin._id, username: admin.userName };
  res.status(200).json({ message: 'Login successful' });
};

export const logout = (req, res) => {
  currentSession = null; 
  res.status(200).json({ message: 'Logout successful' });
};

export const verifySession = (req, res, next) => {
  if (!currentSession) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  req.adminId = currentSession.id;
  next();
};

export const createSurvey = async (req, res) => {
  const { title, questions } = req.body;
  const survey = new Survey({ title, questions });
  await survey.save();
  res.status(201).json(survey);
};

export const getAllSurveys = async (req, res) => {
  const surveys = await Survey.find();
  res.status(200).json(surveys);
};