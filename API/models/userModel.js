import mongoose from "mongoose"
const Schema = mongoose.Schema


//user schema

const userSchema = new Schema ({
userName:{
type: String,
required: true,
unique: true,
},

fullname:{
type: String,
required: true,
},

teamMembership:{
    type: String, 
},

teamMembershipType: {
    type:String,
    enum: ['Regular','Team Captain','Guest','Ladder Manager','Administrator'],
    
},

accountType: {
    type: String,
    enum: ['Regular','Admin'],
},
password: {
    type: String,
    required: true,
}   


},
{timestamps: true});

export const user = mongoose.model('users2',userSchema)