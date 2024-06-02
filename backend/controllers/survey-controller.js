import Survey from "../models/survey.js";

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

export const getAsurvey = async (req, res) => {
    try {   
        const survey = await Survey.findById('665a0dcb33316a10babbe0b6');
        if(!survey){
            return res.status(404).json({ error: 'Survey not found' });
        }
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fillSurvey = async (req, res) => {
    try {
        const { surveyId, respondent, responses } = req.body;

        // Find the survey by ID
        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        // Ensure userResponses is initialized
        if (!Array.isArray(survey.userResponses)) {
            survey.userResponses = [];
        }

        // Add the user response to the survey
        survey.userResponses.push({ respondent, responses });


        // Save the updated survey document
        const updatedSurvey = await survey.save();
        
        
        res.status(200).json(updatedSurvey);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};