import express from 'express'
import {Ladder} from '../models/ladderModel.js'
import { Team } from '../models/teamModel.js';

const router = express.Router();
// Route to create (POST) a new ladder
router.post('/', async(req,res) => {
    const {ladderID,ladderManager,ladderName} = req.body
    try {
        const ladders = await Ladder.create({
            ladderID,ladderManager,ladderName
        }) 
        res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
});

// Get all ladders from database
router.get ('/', async(req,res) => {
    try {
        const ladders = await Ladder.find({}).sort({createdAt:-1})
        
        return res.status(200).json({
            count: ladders.length,
            data: ladders
        });
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
});

// Get a single ladder from database
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const ladders = await Ladder.findById(id)
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({error: 'ladder not found'})
    }

});


//Delete a single ladder from database
router.delete('/:id', async(req,res) => {
    const {id} = req.params
    const ladders = await Ladder.findOneAndDelete({_id:id})
    if (!ladders) {
        res.status(404).json({error: 'ladder not found'})
    }
    return res.status(200).json(ladders)
});

//Update a ladder "ladderManager"
router.put('/:id/manager', async(req,res) => {
    try {
        if(
            !req.body.ladderManager
        ) {
            return res.status(400).send ({
                message: 'Send all required field: ladderManager',
            });
        }  
        const {id} = req.params;
        const ladders = await Ladder.findByIdAndUpdate(id, req.body);
        if (!ladders) {
            return res.status(404).json({message: 'ladder not found'})
        }
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.put('/:id/name', async(req,res) => {
    try {
        if(
            !req.body.ladderName
        ) {
            return res.status(400).send ({
                message: 'Send all required field: ladderName',
            });
        }  
        const {id} = req.params;
        const ladders = await Ladder.findByIdAndUpdate(id, req.body);
        if (!ladders) {
            return res.status(404).json({message: 'ladder not found'})
        }
        return res.status(200).json(ladders)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});


router.get('/:ladderID/teams', async (request, response) => {
    try {
        const { ladderID } = request.params;
        
        const teams = await Team.find({ ladderID });

        //return response.status(200).json(teams);

        return response.status(200).json({
            count: teams.length,
            data: teams
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;