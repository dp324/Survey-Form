import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required : true
    }
});

adminSchema.virtual('surveys', {
    ref: 'Survey',
    localField: '_id',
    foreignField: 'admin',
    justOne: false
});

export default mongoose.model('Admin', adminSchema);