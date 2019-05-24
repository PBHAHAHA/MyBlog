const express = require('express');
const router = express.Router()
const Tags = require('../../models/Tags')
const passport = require('passport')

//查询所有
router.get('/',(req,res) => {
    Tags.find()
    .then(tags => {
        if(!tags){
            return res.status(404).json('没有任何标签！')
        }
        res.json(tags)
        console.log(res.json(tags))
    })
    .catch(err => {
        res.status(404).json('tags.js--查询----'+err)
    })
})
//添加标签
router.post('/addTags',passport.authenticate('jwt',{session:false}),(req,res) => {
    Tags.findOne({tags:req.body.tags}).then((tags) => {
        if(tags) {
            return res.status(400).json({tags:'标签已有，勿重复'})
        }else{
            const tags = new Tags({
                tags     : req.body.tags,
                nickName : req.body.nickName
            })
            tags.save()
            .then(tags => {
                res.json(tags)
            })
            .catch(err => {
                res.json('tags.js--添加---:'+err)
            })
        }
    })
    // res.json('kkk')
})

//删除
router.post('/deleteTags/:id',(req,res) => {
    Tags.findOneAndRemove({_id:req.params.id})
    .then(tags => {
        tags.save()
        .then(tags => {
            res.json(tags)
        })
    })
    .catch(err => {
        res.status(404).json('删除失败')
    })
})
//编辑
router.post('/edit/:id',(req,res) => {
    const tagsEdit = {};
    if(req.body.tags) tagsEdit.tags = req.body.tags
    if(req.body.nickName) tagsEdit.nickName = req.body.nickName
    Tags.findOneAndUpdate(
        { _id: req.params.id },
        { $set: tagsEdit },
        { new: true }
    ).then(tags => res.json(tags))
})



module.exports = router