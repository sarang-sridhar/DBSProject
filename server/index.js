var bodyParser = require('body-parser')
const express = require('express')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const db = require('./models')

const loginRouter = require('./routes/Login')
app.use('/login',loginRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on 3001")
    })
})
