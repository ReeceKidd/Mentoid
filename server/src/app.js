const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined')) //Allows Morgan to print out logs in certain way. 
app.use(bodyParser.json()) //Allow our app to parse JSON easily. 
app.use(cors()) //This allows any client to access this. This is a security risk.

app.get('/register', (req, res) => {
    res.send({
        message: 'Hello ${req.body.email} your user was registered'
    })
})

app.listen(process.env.PORT || 8081)