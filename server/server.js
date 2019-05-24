const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

const passport = require('passport')


const db   = require('./config/db').mongoURI
const users = require('./routers/api/users')
const essay = require('./routers/api/essay')
const tags = require('./routers/api/tags')
const setting = require('./routers/api/setting')
const remark = require('./routers/api/remark')

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

mongoose.connect(db).then( () => {
    console.log('数据库已连接~')
}).catch(err => {
    console.log(`数据库连接失败,错误信息：${err}`)
})

// //初始化 passport
app.use(passport.initialize());
require('./config/passport')(passport)


app.use('/api/user',users)
app.use('/api/essay',essay)
app.use('/api/tags',tags)
app.use('/api/remark',remark)
app.use('/api/setting',setting)

const port = process.env.PORT || 8686

app.listen(port , () => {
    console.log(`服务器运行在http://localhost:${port}端口。`);
})