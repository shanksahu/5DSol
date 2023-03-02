const router = require('express').Router()
const { addScripts, updateScript, deleteScript, scriptsList } = require('./controller')
const upload = require('./utils/multer')
const emptyString = require('./utils/emptyString')
const scriptValidator = require('./utils/objectValidation')



router.post('/script', upload, emptyString, scriptValidator, addScripts)

router.put('/script/:id', upload, emptyString, scriptValidator, updateScript)

router.delete('/script/:id', deleteScript)

router.get('/script', scriptsList)

module.exports = router