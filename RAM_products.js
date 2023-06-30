const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RAMproduct = new Schema ({
    RAMCall: {
        type: String
    },
    RAMPurpose: {
        type: String
    },
    RAMType: {
        type: String
    },
    RAMVolume: {
        type:Number
    },
    RAMBar: {
        type:Number
    },
    RAMImage: {
        type:String
    },
    cloudinaryPublicId: {
        type:String
    } 
})

mongoose.model('RAM', RAMproduct)