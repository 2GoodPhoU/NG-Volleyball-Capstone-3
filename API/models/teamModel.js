import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
        },
        ladderID: {
            type: Number,
            required: true,
            
        },
        captainUsername: {
            type: String,
            required: true,
        },
        challengeID: {
            type: Number,
            required: false,
        },
        ladderPosition: {
            type: Number,
            required: true,
        },
    },

);

export const Team = mongoose.model('team', teamSchema);