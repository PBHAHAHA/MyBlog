const express = require('express')
const router = express.Router()
const Remark = require('../../models/Remark')
const Essay = require('../../models/Essay')
const Tags = require('../../models/Tags')

//添加评论
router.post('/addRemark',(req,res) => {
    const newRemark = new Remark({
        remarkId   : req.body.remarkId,
        content    : req.body.content
    })
    newRemark.save().then(remark => {
        res.json(remark)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:remarkId',(req,res) => {
    Remark.find({remarkId:req.params.remarkId})
    .then(remark => {
        if(!remark) {
            return res.status(404).json('没有任何内容！')
        }else{
            res.json(remark)
        }
    })
})

//根据标签的nickName获取评论
// router.get('/:nickName',(req,res) => {
//     console.log(req.params)
//     Tags.find().populate({
//         path:req.params.nickName,
//         select:'tags',
//         model: 'Tags',
//         populate:{
//             path: 'tags',
//             select : '_id title'    
//         }
//     })
//     .then(remark => {
//         if(!remark) {
//             return res.status(404).json('没有任何内容！')
//         }else{
//             res.json(remark)
//         }
//     })
// })

module.exports = router