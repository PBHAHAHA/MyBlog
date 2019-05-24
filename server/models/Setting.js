const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingSchema = new Schema({
    title : {
        type     : String,
        required : true
    },
    desc : {
        type     : String
    },
    keys : {
        type     : String,
        required : true
    },
    isRemark : {
        type     : Boolean,
        required : true
    }
})

module.exports = Setting = mongoose.model('Setting',settingSchema)