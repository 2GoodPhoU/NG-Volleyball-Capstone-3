import mongoose from "mongoose";
const Schema = mongoose.Schema

const matchSchema = new Schema ({

    matchID: {
        type: Number,
        required: true,
        unique: true
    },
    team1Match: {
        //Type would be of Object ID 
        //type: mongoose.Schema.Types.ObjectId,
        //References of Team documents collection based on ObjectID
        type: String,
        ref: 'Team',
        required: true
    },
    team2Match: {
        //type : mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Team',
        required: true
    },
    locationMatch: {
        type: String,
        required: true
    },
    resultMatch: {
        type: {
            winner: {
                type: String,
                ref: 'Team' // Reference to the winning team "Team B" (winner)
            },
            loser: {
                type: String,
                ref: 'Team' // Reference to the losing team "Team A" (loser)
            },
            draw: {
                type: Boolean,
                default: false // Indicates if the match ended in a draw (true or false)
            },
            scores: {
                type: Map, // for storing scores "TeamA": 10, "TeamB": 20
                default: {}
            },
        },
        required: true
    },
    timeMatch: {
        type: Date,
        default: Date.now
    },
    

});

export const Match = mongoose.model('matches', matchSchema)