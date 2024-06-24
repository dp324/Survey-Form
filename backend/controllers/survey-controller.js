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
        const { surveyId, respondentEmail, respondentName, responses } = req.body;
    
        if (!surveyId || !respondentEmail || !respondentName || !responses) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const survey = await Survey.findById(surveyId);
        if (!survey) {
          return res.status(404).json({ error: 'Survey not found' });
        }
    
        if (!Array.isArray(survey.userResponses)) {
          survey.userResponses = [];
        }
    
        // Remove existing response from the same respondent
        survey.userResponses = survey.userResponses.filter(response => response.respondentEmail !== respondentEmail);
        
        // Add new response
        survey.userResponses.push({ respondentEmail, respondentName, responses });
    
        const updatedSurvey = await survey.save();
    
        res.status(200).json(updatedSurvey);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
};
