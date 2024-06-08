import express from 'express'
import { fillSurvey, getAsurvey } from '../controllers/survey-controller.js';

const surveyRouter = express.Router();

surveyRouter.get('/get-a-survey/:id', getAsurvey)
surveyRouter.post('/submit-survey', fillSurvey);

export default surveyRouter;