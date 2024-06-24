import express from 'express'
import { checkLogin, createSurvey, deleteSurvey, getAllSurveys, login, logout, signup, surveyInfo, verifyToken } from '../controllers/admin-controller.js';

const adminRouter = express.Router();

adminRouter.post('/login', login)
adminRouter.post('/logout', logout)
adminRouter.get('/checkLogin', verifyToken, checkLogin);
adminRouter.post('/create-survey', verifyToken, createSurvey)
adminRouter.get('/surveyInfo/:id', verifyToken, surveyInfo)
adminRouter.get('/all-survey', verifyToken, getAllSurveys)
adminRouter.post('/signup', signup)
adminRouter.delete('/delete-survey/:id', verifyToken, deleteSurvey);

export default adminRouter;