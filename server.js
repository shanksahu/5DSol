const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyparser = require('body-parser')
const app = express()
require('dotenv').config()


//mongoDB connection 
require('./src/dbConnections')

// allowing access to domains
app.use(cors({
    origin: '*'
}));

//middleware
app.use(bodyparser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyparser.json({ limit: '30mb' }))

// set default route
app.get('/', (req, res) => {
    return res.status(200).send(`server is listning at PORT ${process.env.PORT}`)
})


// import routes
const routes = require('./src/routers')

//time Calculation 
app.use((req, res, next) => {
    let date = new Date();
    req.startTime = {
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        ms: date.getMilliseconds()
    }
    next()
})

//creating uplode folder 
let folderCreate = require("./src/utils/isFolderExist")
folderCreate()

//redirect to the router
app.use(routes)


// no route error handling
app.use((req, res) => {
    return res.send("Error: 404 Page not found")
})

//error handling
function errorHandler(err, req, res, next) {
    if (err) {
        return res.send({error:"Internal Server Error"})
    }
    next()
}
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server is listning at port http://localhost:${process.env.PORT}`);
})
