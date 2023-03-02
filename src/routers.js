const router = require('express').Router()
const { addScripts, updateScript, deleteScript, scriptsList } = require('./controller')
const upload = require('./utils/multer')
const isFolderExist = require('./utils/isFolderExist')
const emptyString = require('./utils/emptyString')
const scriptValidator = require('./utils/objectValidation')



router.post('/script', isFolderExist, upload, emptyString, scriptValidator, addScripts)

router.put('/script/:id', isFolderExist, upload, emptyString, scriptValidator, updateScript)

router.delete('/script/:id', deleteScript)

router.get('/script', scriptsList)

module.exports = router