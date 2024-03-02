import mongoose from "mongoose"
const Schema = mongoose.Schema

//ladder Schema 
const ladderSchema = new Schema ({
    ladderID: {
        type: Number,
        required: true,
        unique: true
    },
    ladderManager: {
        type: String,
        required: true
    }

});

export const Ladder = mongoose.model('ladders',ladderSchema)