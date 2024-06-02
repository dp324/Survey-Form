import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required : String
    }
})

export default mongoose.model('Admin', adminSchema);