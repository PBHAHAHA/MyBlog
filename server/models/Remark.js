const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RemarkSchema = new Schema({
    remarkId : {
        type    : Number,
        require : true
    },
    content : {
        type : String,
        require : true
    },
    date: {
        type    : Date,
        default : Date.now
    }
})

module.exports = Remark = mongoose.model('remark',RemarkSchema)