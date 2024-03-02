import express from 'express'
import {Match} from '../models/matchModel.js';

const router = express.Router();

//Route to create (POST) for a new Match

router.post('/', async(req,res) => {
    const {
    matchID,
    team1Match,
    team2Match,
    locationMatch,
    resultMatch,
    timeMatch,
} = req.body

    try {
        const matches = await Match.create ({
            matchID,
            team1Match,
            team2Match,
            locationMatch,
            resultMatch,
            timeMatch})
        res.status(200).json(matches)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

//Get all Matches from database
router.get('/', async(req,res) => {
    try {
        const matches = await Match.find({}).sort({createdAt:-1})
        res.status(200).json(matches)
       //console.log('***VALID GET MATCHES REQUEST***')
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
});

//Get a single Match from database
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const matches = await Match.findById(id)
        return res.status(200).json(matches)
    }
    catch (error) {
        res.status(500).json({error: 'match not found'})
    }
});

// Delete a single Match from database
router.delete('/:id', async(req,res) => {
    const {id} = req.params
    const matches = await Match.findOneAndDelete({_id:id})
    if (!matches) {
        return res.status(404).json({error: 'match not found'})
    }
    return res.status(200).json(matches)
});


// Update a Match "timeMatch", "locationMatch", & "resultMatch"
router.put('/:id', async(req,res) => {
    try {
        if (
            !req.body.timeMatch ||
            !req.body.resultMatch ||
            !req.body.locationMatch
        ){
            return res.status(400).send({
                message: 'Send all required fields: timeMatch & resultMatch',
            });
        }
        const {id} = req.params
        const matches = await Match.findByIdAndUpdate(id,req.body);
        if (!matches) {
            return res.status(404).json({message: 'match not found'})
        }
        return res.status(200).json(matches)
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }

});


export default router;