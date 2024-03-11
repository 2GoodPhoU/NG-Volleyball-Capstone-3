import express from 'express'
import { Challenges } from '../models/challengesModel.js';


const router = express.Router();

//Route to create (POST) new Challenge
router.post('/', async(req,res) => {

    const {challengeID, 
        teamStartedChallenge, 
        teamReceivedChallenge,
        challengeStatus,
        timeLeft
    } = req.body

    try {
        const challenges = await Challenges.create({
            challengeID, 
            teamStartedChallenge, 
            teamReceivedChallenge,
            challengeStatus,
            timeLeft})
        res.status(200).json(challenges)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//Get all Challenges from database
router.get('/', async(req,res) => {
    try {
        const challenges = await Challenges.find({}).sort({createdAt:-1})
        res.status(200).json(challenges)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
});

//Get a single Challenge from database
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const challenges = await Challenges.findById(id)
        return res.status(200).json(challenges)
    }
    catch (error) {
        response.status(500).json({error: 'challenge not found'})
    }

});

//Delete a single Challenge from database
router.delete('/:id', async(req,res) => {
    const {id} = req.params

    const challenges = await Challenges.findOneAndDelete({_id:id})

    if (!challenges) {
        return res.status(404).json({error: 'challenge not found'})
    }
    return res.status(200).json(challenges)

});

//Update a challenge "challengeStatus" & "timeLeft"
router.put('/:id',async(req,res) => {
    
    try {
        if(
            !req.body.challengeStatus ||
            !req.body.timeLeft
            //!request.body.challengeID ||
            //!request.body.captainUsername
        ){
            return res.status(400).send({
                message: 'Send all required fields: challengeStatus & timeLeft',
            });
        }

        const { id } = req.params;
        const challenges = await Challenges.findByIdAndUpdate(id, req.body);

        if(!challenges){
            return res.status(404).json({message: 'challenge not found'});
        }
        return res.status(200).json(challenges);
    }

    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }


});



export default router;