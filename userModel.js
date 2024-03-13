import mongoose from "mongoose"
const Schema = mongoose.Schema


//user schema

const userSchema = new Schema ({
userName:{
type: String,
required: true,
unique: true,
},

nameID:{
type: String,
required: true,
},

teamMembershipName:{
    type: String,
    required: true,
    unique:true,
},

teamMembershipType: {
    type:String,
    enum: ['Regular','Team Captain','Guest','Ladder Manager','Administrator'],
    required: true,
},

accountType: {
    type: String,
    enum: ['Regular','Premium'],
},
password: {
    type: String,
    required: true,
}   


},
{timestamps: true})

export const user = mongoose.model('user',userSchema)