import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserResponseSchema = new Schema({
  respondentEmail: { type: String, required: true },
  respondentName: { type: String, required: true },
  responses: [{ questionId: Schema.Types.ObjectId, answer: String }],
}, { _id: false });

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, required: true, enum: ['paragraph', 'mcq'] },
  options: { type: [String], default: function () { return this.questionType === 'mcq' ? [] : undefined; } }
});

const SurveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuestionSchema],
  userResponses: { type: [UserResponseSchema], default: [] },
  admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }
});

export default mongoose.model('Survey', SurveySchema);
