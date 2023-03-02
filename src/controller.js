const model = require('./model')
const path = require('path');
const mongoose  = require('mongoose')
const ObjectId =  mongoose.Types.ObjectId;
const fs = require('fs');
const dir = path.join(__dirname, process.env.FOLDER_PATH);

const addScripts = async(req, res)=>{
    try {
        let files = req.files
        let body = req.body
        if (files){
            files.testCsv ? body.testCsvPath = files.testCsv[0].path : body.testCsvPath = null
            files.testText ? body.environmentFilePath = files.testText[0].path : body.environmentFilePath = null
        }
        body.timeTaken = timeTaken(req.startTime) // calculating timetaken for uploading....
        let insertObj={...body}
        model.create(insertObj) //inserting into database
        return res.status(200).redirect("/script")
    } catch (error) {
        return res.status(401).send({error:error.message})
    }
}

const updateScript = async(req, res)=>{
    try {
        let files = req.files
        let body = req.body
        let id = req.params.id
        if (Object.keys(files).length ||files) {
            files.testCsv ? body.testCsvPath = files.testCsv[0].path : false
            files.testTxet ? body.environmentFilePath = files.testTxet[0].path : false
        }
        let script = await model.findByIdAndUpdate(id, body,{new:false})
        if(script){
            if (body.testCsvPath !== null){
                if (fs.existsSync(script.testCsvPath)) {
                    fs.unlinkSync(script.testCsvPath);
                }
            }
            if (body.environmentFilePath !== null){
                if (fs.existsSync(script.environmentFilePath)) {
                    fs.unlinkSync(script.environmentFilePath);
                }
            }
        }
        return res.status(200).send({ message:"Script has been Edited"})
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }
}

const deleteScript = async(req, res)=>{
    try {
        let id = req.params.id
        let deletedScript = await model.findByIdAndDelete(id)
        if (deletedScript) {
            if (deletedScript.testCsvPath !== null) {
                if (fs.existsSync(deletedScript.testCsvPath)) {
                    fs.unlinkSync(deletedScript.testCsvPath);
                }
            }
            if (deletedScript.environmentFilePath !== null) {
                if (fs.existsSync(deletedScript.environmentFilePath)) {
                    fs.unlinkSync(deletedScript.environmentFilePath);
                }
            }
        }
        return res.status(200).send({ message: "Script has been Deleted" })
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }
}

const scriptsList = async(req, res)=>{
try {
    let { limit, page } = req.query
    limit ? limit * 1 : 0
    let skip
    if (page) {
        skip = (page - 1) * limit
    } else {
        skip = 0
    }
    let scriptList = await model.find({}, { testName: 1, addedOn: "$createdAt", timeTaken :1,status:1}).limit(limit).skip(skip).sort({ testName: 1 })
    return res.status(200).send({ scriptList })
} catch (error) {
    return res.status(401).send({ error: error.message })
}
}

const timeTaken = (startTime)=>{
    let date = new Date();
    endTime = {
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        ms: date.getMilliseconds()
    }
    let diff = Object.keys(endTime).reduce((a, k) => {
        a[k] = Math.abs(endTime[k] - startTime[k]);
        return a;
    }, {});
    let timeTaken 
    if(diff.mm!==0){
        timeTaken = `${diff.mm}min and ${diff.ss}sec`
    } else if (diff.ss !== 0){
        timeTaken = `${diff.ss}sec and ${diff.ms}milisec`
    }else{
        timeTaken = `${diff.ms}milisec`
    }
    return timeTaken
}

module.exports = { addScripts, updateScript, deleteScript, scriptsList }