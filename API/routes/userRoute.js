import express, { request } from 'express';
import { user } from "../models/userModel.js";
import { Team } from "../models/teamModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret.js';
import cookieParser from 'cookie-parser';

const salt = bcrypt.genSaltSync(10);


const router = express.Router();

router.use(cookieParser());

//route to create (post) for a new user

router.post('/signup', async (req, res) => {
    const { userName, fullname, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, salt);
    try {
        const newUser = await user.create({
            userName,
            fullname,
            password
        });
        return res.status(201).send(newUser);
    } catch (error) {
        console.error(error.message);
        if (error.code == 11000) {
            return res.send({ status: 'error', error: 'Email already exists' });
        }
        return res.status(500).send({ error: 'Internal server error' });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const userDoc = await user.findOne({ userName });
        if (!userDoc) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(422).json({ error: 'Password not correct' });
        }
        jwt.sign({
            fullname: userDoc.fullname,
            userName: userDoc.userName,
            id: userDoc._id
        }, JWT_SECRET, {}, (error, token) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.cookie('token', token).json(userDoc);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const { fullname, userName, _id, teamMembership, teamMembershipType, accountType } = await user.findById(userData.id);
            if (!fullname || !userName || !_id) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ fullname, userName, _id, teamMembership, teamMembershipType, accountType });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
  });

router.post('/logout', (req, res) => {

    res.cookie('token', '').json(true);
    
});


//Get all users from database
router.get('/', async(req,res) => {
    try {
        const users = await user.find({}).sort({createdAt:-1})
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
})
    //getting single user
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const users = await user.findById(id)

        return res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({error: 'user not found'})
    }})



    //update a single user
    router.put('/:id',async (req,res) => {
        try {
            if(
                !req.body.userName
                //ask for additional information?
            ){
                return res.status(400).send({
                    message: 'Send all required fields: User Name',
                });
            }
    
            const { id } = req.params;
            const result = await user.findByIdAndUpdate(id, req.body);
    
            if(!result){
                return res.status(404).json({message: 'user not found'});
            }
            return res.status(200).send({message: 'user name updated successfully'});
        }
    
        catch(error){
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
    
    }),


// Delete a single user from database and remove the user from associated teams
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the user from all associated teams
        await Team.updateMany({ users: userId }, { $pull: { users: userId } });

        return res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// router.route("/profile".post(protect,updateUserProfile))
export default router;



