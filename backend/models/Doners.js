const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const donerSchema = new Schema({
      
    userId: {
        type: Number,
        required: true
    },

    name:{
        type: String,
        required: true

    },

    email:{
        type: String,
        required: true
    },

    address:{
        street:{type: String, required:true},
        city:{type: String, required:true},
        district:{type: String, required:true},
        province:{type: String, required:true},
        postalcode:{type: String, required:true}
    },

    location:{
        latitude:{type:Number, required:true},//
        longitude:{type:Number, required:true},//
    },
    bloodType: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Only allow valid blood types
    },
    createDate:{
        type: Date,
        default: Date.now
    },


});

const Doners = mongoose.model("Doners",donerSchema);
module.exports = Doners;


