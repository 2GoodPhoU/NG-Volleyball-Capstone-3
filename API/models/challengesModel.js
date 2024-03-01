import mongoose from "mongoose"
const Schema = mongoose.Schema
//Challenges Schema
const challengesSchema = new Schema({
    challengeID: {
        type: Number,
        required: true,
        unique: true
    },
    teamStartedChallenge: { 
        type:String,
        // ref: 'Team',
        required:true
    },
    teamReceivedChallenge: {
        type: String,
        // ref: 'Team',
        required: true
    },
    challengeStatus: {
        type: String,
        enum: ['ACCEPTED','PENDING','REJECTED','N/A'],
        default: 'N/A',
        required: true
    },
    timeLeft: {
        // Might need to change this a Date timestamp
        type: Date,
        required: true
    }
    
    
});


export const Challenges = mongoose.model('challenges',challengesSchema)


//1)Worked on controller and model on backend
//2)Testing endpoints today
//3)As of now I have no blockers 