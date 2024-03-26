import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import teamRoute from './routes/teamRoute.js';
import challengesRoute from './routes/challengesRoute.js';
import matchRoute from './routes/matchRoute.js';
import ladderRoute from './routes/ladderRoute.js';
import cors from 'cors';
import {mongoDBURL} from './secret.js';

import userRoute from './routes/userRoute.js';


const app = express();

//Middleware for parsing request body
app.use(express.json());
//Middleware for parsing cookie
app.use(cookieParser());


//Middleware for handling cors policy
//allow all origins with defalt of cors
//app.use(cors());
app.use(cors({credentials:true, origin:'http://localhost:5173',}));
// All custom origins only (better)
/** 
app.use(
    cors({
        origin:'http://localhost:3000',
        method: ['GET', 'POST', 'PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
*/

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to our application');
});

//Middle ware
app.use('/teams',teamRoute);
app.use('/challenges',challengesRoute)
app.use('/matches',matchRoute)
app.use('/ladders',ladderRoute)

app.use('/users',userRoute)



mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`APP is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});
