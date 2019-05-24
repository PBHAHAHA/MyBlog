const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagsSchema = new Schema({
    blogid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'remark'
    },
    tags : {
        type    : String,
        require : true
    },
    nickName : {
        type : String,
        require : true
    },
    date: {
        type    : Date,
        default : Date.now
    }
})

module.exports = Tags = mongoose.model('tags',TagsSchema)