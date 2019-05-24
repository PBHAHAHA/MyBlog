const express = require('express')
const router = express.Router()
const Setting = require('../../models/Setting')
const passport = require('passport')
const formidable = require("formidable")
const fs = require('fs')
const util = require('util')

router.get('/test',(req,res) => {
    res.json({msg : 'Setting test!'})
})

router.post('/icon',(req,res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/images" //上传文件的保存路径
    form.keepExtensions = true //保存拓展名

    form.parse(req,function(error, fields,files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    })
})

module.exports = router