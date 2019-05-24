const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbKey = require('../../config/db').secretOrKey
const router = express.Router()
const passport = require('passport')
const Users = require('../../models/Users')


router.post('/register',(req,res) => {
    console.log(req.body)
    Users.findOne({username:req.body.username}).then((user) => {
        if(user){
            return res.status(400).json({username:'用户名已被注册！'})
        }else{
            const newUser = new Users({
                username : req.body.username,
                password : req.body.password,
                password : req.body.password2
            })
            //密码加密
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,function(err,hash){
                    if(err) throw res.json(err)
                    newUser.password = hash
                    newUser.save().then(user => {
                        res.json(user)
                    }).catch(err => {
                        console.log(err)
                    })
                })
            })
        }
    })
}),
router.post('/login',(req,res) => {
    const username = req.body.username
    const password = req.body.password
    Users.findOne({username}).then((user) => {
        if(!user){
            res.json({msg:''})
        }else{
            //解析密码
            bcrypt.compare(password,user.password).then(isMatch => {
                if(isMatch){
                    const rule = {
                        id: user.id,
                        username:user.username
                    }
                    jwt.sign(rule,dbKey,{expiresIn:36000},(err,token) => {
                        if(err) throw err;
                        res.json({
                            success : true,
                            token   : 'Bearer ' + token
                        })
                    })
                }else{
                    res.status(400).json({msg:'密码错误'})
                }
            })
        }
    })
    
}),
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    //返回的信息
    res.json({
        id: req.user.id,
        username: req.user.username,
    })
})

module.exports = router