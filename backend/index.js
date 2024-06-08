import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import router from './routers/user-routes.js'
import surveyRouter from './routers/survey-routes.js';
import adminRouter from './routers/admin-routes.js';
import cookieParser from 'cookie-parser';


const app = express();


const corsConfig = {
    origin : "http://localhost:5173",
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.use(cors());
// app.use(
//     cors({
//         origin : ['http://localhost:5173'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//         allowedHeaders: ['content'],
//         credentials : [true]
//     })
// )

// app.get('/', (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH" ); 
//     res.send("hello");
//     //console.log("heh");
// })



app.use(cookieParser());
app.use(express.json());
app.use("/user", router)
app.use("/survey", surveyRouter)
app.use("/admin", adminRouter)

const mongoDBURL = 'mongodb+srv://deepanshux324:ZYQBrM9U6uykw5wI@cluster0.zb6ehfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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