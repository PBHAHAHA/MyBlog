const express = require('express')
const router = express.Router()
const Essay = require('../../models/Essay')
const passport = require('passport')

router.get('/test', (req, res) => {
    res.json({ msg: 'essay works' });
});

//发布文章
router.post('/addEssay',(req,res) => {
    // console.log(req.body)
    const newEssay = new Essay({
        title    : req.body.title,
        tags     : req.body.tags,
        remarkId : Date.now(),
        part     : req.body.part,
        imgURL   : req.body.imgURL == '' ? 'http://www.maplejoyous.cn/assets/images/default_cover.jpg?v=ae84ccd48a' : req.body.imgURL,
        contents : req.body.contents,
    })
    newEssay.save().then(essay => {
        res.json(essay)
    }).catch(err => {
        // console.log(err)
    })
});
// 获取所有文章
router.get('/',(req,res) => {
        Essay.find().then(essay => {
            if(!essay){
                return res.status(404).json('没有任何内容')
            }
            res.json(essay)
        }).catch(err => {
            res.status(404).json('err')
        })
})
//查询
router.get('/:id',(req,res) => {
    // console.log(req)
    Essay.findOne({_id:req.params.id})
    .then(essay => {
        if(!essay) {
            return res.status(404).json('没有任何内容！')
        }else{
            res.json(essay)
        }
    })
    .catch(err => {
        res.status(404).json(err)
    })
})
//根据标签查询
router.post('/',(req,res) => {
    // console.log(req)
    Essay.find({tags:req.body.tags})
    .then(essay => {
        if(!essay) {
            return res.status(404).json('没有任何内容！')
        }else{
            res.json(essay)
        }
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

//删除 
router.post('/delete',(req,res) => {
    // console.log(req)
    Essay.findOneAndRemove({_id:req.body.id})
    .then(essay => {
        essay.save()
        .then(essay => res.json(essay))
    })
    .catch(err => {
        res.status(404).json('删除失败')
    })
})

//编辑
router.post('/edit/:id',(req,res) => {
    const essayEdit = {};
    if(req.body.title) essayEdit.title = req.body.title;
    if(req.body.imgURL) essayEdit.imgURL = req.body.imgURL;
    if(req.body.part) essayEdit.part = req.body.part
    if(req.body.contents) essayEdit.contents = req.body.contents;
    if(req.body.tags) essayEdit.tags = req.body.tags
    // console.log()
    Essay.findOneAndUpdate(
        { _id: req.params.id },
        { $set: essayEdit },
        { new: true }
    ).then(essay => res.json(essay))
})

//首页查询
router.post('/search',(req,res) => {
    const searchString = req.body.searchString
    Essay.find({$text: {$search: searchString}}).then(essay => {
        res.json(essay)
    })
})

module.exports = router