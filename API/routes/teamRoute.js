import express from 'express';
import { Team } from '../models/teamModel.js';

const router = express.Router();


//Route to create a new team
router.post('/', async (request,response) => {
    try{
        if(
            !request.body.teamName ||
            !request.body.ladderID ||
            !request.body.captainUsername ||
            //!request.body.challengeID ||
            !request.body.ladderPosition
        ) {
            return response.status(400).send({
                message: 'send data',
            });
        }
        const newTeam = {
            teamName: request.body.teamName,
            ladderID: request.body.ladderID,
            captainUsername: request.body.captainUsername,
            challengeID: request.body.challengeID,
            ladderPosition: request.body.ladderPosition,
        };
        const team = await Team.create(newTeam);

        return response.status(201).send(team);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
 
 });

 //Route for Get all teams info from database
 router.get('/',async (request,response) => {
    try {
        const team = await Team.find({});
        return response.status(200).json({
            count: team.length,
            data: team
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get one team info from database by id
router.get('/:id',async (request,response) => {
    try {

        const { id } = request.params;

        const team = await Team.findById(id);
        return response.status(200).json(team);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update team's name
router.put('/:id',async (request,response) => {
    try {
        if(
            !request.body.teamName 
            //!request.body.challengeID ||
            //!request.body.captainUsername
        ){
            return response.status(400).send({
                message: 'Send all required fields: team name',
            });
        }

        const { id } = request.params;
        const result = await Team.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'team not found'});
        }
        return response.status(200).send({message: 'teamName updated successfully'});
    }

    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

//Route for delete a team

router.delete('/:id', async(request,response) => {
    try {
        const { id } = request.params;

        const result = await Team.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'team not found'});

        }
        return response.status(200).send({message: 'team deleted successfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;