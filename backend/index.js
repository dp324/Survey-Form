import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routers/user-routes.js'
import surveyRouter from './routers/survey-routes.js';
import adminRouter from './routers/admin-routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(cors({
    origin: 'https://survey-form-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use("/user", router)
app.use("/survey", surveyRouter)
app.use("/admin", adminRouter)

const mongoDBURL = process.env.MONGODB_URI;

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Connected to DB');
    app.listen(8080, () => {
        console.log('Listening');
    })
})
.catch((err) => {
    console.log(err);
})