const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, process.env.FOLDER_PATH);


const createUploadFolder = async () => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }   
}

module.exports = createUploadFolder