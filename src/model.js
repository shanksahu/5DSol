const { Schema, model} = require('mongoose')

const collection = model('script',Schema({
    testName:{
        type:String
    },
    serverUrl:{
        type:String
    },
    method:{
        type:String
    },
    testDesc:{
        type:String
    },
    environmentFilePath:{
        type:String
    },
    testCsvPath:{
        type:String
    },
    timeTaken:{
        type:String
    },
    status:{
        type:String,
        default:"Running"
    }
}, { timestamps: true }))

module.exports = collection