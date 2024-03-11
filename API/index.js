import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Team } from "./models/teamModel.js";
import teamRoute from './routes/teamRoute.js';
import cors from 'cors';
import {mongoDBURL} from './secret.js'; 


const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
//allow all origins with defalt of cors
app.use(cors());
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
    return response.status(234).send('Welcome');
});

//Middle ware
app.use('/teams',teamRoute);



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
