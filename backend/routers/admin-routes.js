import express from 'express'
import { createSurvey, getAllSurveys, login, logout, signup, verifySession } from '../controllers/admin-controller.js';

const adminRouter = express.Router();

adminRouter.post('/login', login)
adminRouter.post('/logout', logout)
adminRouter.post('/create-survey', verifySession, createSurvey)
adminRouter.get('/all-survey', verifySession, getAllSurveys)
adminRouter.post('/signup', signup)


export default adminRouter;