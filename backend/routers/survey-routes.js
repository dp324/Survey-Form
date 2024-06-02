import express from 'express'
import { createSurvey, fillSurvey, getAsurvey } from '../controllers/survey-controller.js';

const surveyRouter = express.Router();

surveyRouter.get('/get-a-survey', getAsurvey)
surveyRouter.post('/create-survey', createSurvey)
surveyRouter.post('/submit-survey', fillSurvey);

export default surveyRouter;