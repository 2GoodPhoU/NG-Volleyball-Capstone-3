import express, { request } from 'express';
import { user } from "../models/userModel.js"



const router = express.Router();



//route to create (post) for a new user



router.post('/',async(req,res) => {
    try{
if (
    !req.body.userName ||
    !req.body.userId ||
    !req.body.teamMembershipName ||
    !req.body.teamMembershipType 

)
        {
            return response.status(400).send({
                message: 'send data',
            });
        }

        const newUser = {
            userName: req.body.userName,
            userId: req.body.userId,
            teamMembershipName: req.body.teamMembershipName,
            teamMembershipType: req.body.teamMembershipType,
            accountType: req.body.accountType,
            password: req.body.password
           
        };
        const user = await user.create(newUser);


        return response.status(201).send(user);
    } 
    catch (error) {
        console.log(error.message);
        //response.status(500).send({message: error.message});
    }

}),



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
                !request.body.userName
                //ask for additional information?
            ){
                return response.status(400).send({
                    message: 'Send all required fields: User Name',
                });
            }
    
            const { id } = request.params;
            const result = await Team.findByIdAndUpdate(id, request.body);
    
            if(!result){
                return response.status(404).json({message: 'user not found'});
            }
            return response.status(200).send({message: 'user name updated successfully'});
        }
    
        catch(error){
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    
    }),





    // Delete a single user from database
router.delete('/:id', async(req,res) => {
    try{

    const {id} = req.params

    const users = await users.findOneAndDelete({_id:id})


    if (!users) {
        return res.status(404).json({error: 'match not found'})
    }
            return response.status(200).send({message: 'user sucessfully deleted'});
        }
        catch (error) {
            console.log(error.message);

            response.status(500).send({message: error.message});
        }

});


// router.route("/profile".post(protect,updateUserProfile))
export default router;



