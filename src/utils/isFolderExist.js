const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, process.env.FOLDER_PATH);


const createUploadFolder = async (req, res, next) => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        next()
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

module.exports = createUploadFolder