import express from 'express';
import { Team } from '../models/teamModel.js';
import { user } from '../models/userModel.js';

const router = express.Router();


//Post to creat a new team 
router.post ('/', async(req,res) => {
    try {
        const {teamName,ladderID, captainUsername, ladderPosition, users} = req.body;

        if (  !teamName || !ladderID || !captainUsername || ! ladderPosition || !users ) {
            return res.status(400).json({message: "Please Provide all required Data"});
        }

        //Check if team with name exists
        const existingTeam = await Team.findOne({teamName});
        if (existingTeam) {
            return res.status(400).json({message: 'A team with same name alread exists '});
        }

        //Create Team
        const team = await Team.create({teamName,ladderID, captainUsername,ladderPosition});
        
        //Find users and asscoiate them with a new team
        //Maps over the users in which userData can be a string
        const userPromises = users.map(async(userData) => {
            let userName;
            //If user Data is string assign it so userName
            if (typeof userData === 'string') {
                userName = userData;
            } else if (typeof userData === 'object' && userData.email) { //If object and email assign it to userName
                userName = userData.email; 
            } else {
                throw new Error('Invalid user data provided');
            }
            //Find a user in the database with userName
            const User = await user.findOne({userName});
            //if no user found throw error
            if (!User) {
                throw new Error(`User '${userName}' does not exist`);
            }
            //If we find one pust the users id into the teams "users" array
            team.users.push(User._id);
        });
        await Promise.all(userPromises);
        // Save Team object to database
        await team.save();
        return res.status(201).json({message: 'team created successfully', team});

        } catch (error) {
            console.error('Error creating team', error);
            res.status(500).json({ message: 'Server error'});
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
            !request.body.teamName ||
            !request.body.users
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