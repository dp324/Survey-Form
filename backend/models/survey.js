import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserResponseSchema = new Schema({
    respondent: { type: String, required: true },
    responses: [{ questionId: Schema.Types.ObjectId, answer: String }]
}, { _id: false });

// Define the schema for questions
const QuestionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [String]
});

// Define the schema for the survey
const SurveySchema = new Schema({
    title: { type: String, required: true },
    questions: [QuestionSchema],
    userResponses: { type: [UserResponseSchema], default: [] }
});
// Create the model
export default mongoose.model('Survey', SurveySchema);


