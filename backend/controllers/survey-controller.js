import Survey from "../models/survey.js";


export const getAsurvey = async (req, res) => {
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