const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EssaySchema = new Schema({
      title : {
          type      : String,
          required  : true
      },
      imgURL : {
          type      :  String,
          default   : 'http://www.maplejoyous.cn/assets/images/default_cover.jpg?v=ae84ccd48a' 
      },
      contents: {
          type      : String,
          required  : true
      },
      tags : {
          type      : String,
          required  : true
      },
      part : {
          type      : String,
          required  : true
      },
      remarkId : {
          type      : Number,
          required  : true
      },
      date : {
          type      : Date,
          default   : Date.now
      }
})
EssaySchema.index({
    title: "text" ,
    contents: "text",
})
module.exports = Essay = mongoose.model('essay',EssaySchema)