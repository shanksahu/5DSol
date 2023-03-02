const multer = require('multer');
const path = require('path');

const dir = path.join(__dirname, process.env.FOLDER_PATH);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage, //uploading file to the directory
    fileFilter: (req, files, cb) => { // only csv and txet file allowed
        var ext = path.extname(files.originalname);
        if (ext !== '.csv' && ext !== '.txt') {
            return cb('Only text and csv files are allowed',false)
        }
        cb(null, true);
    }
}).fields(
    [
        {
            name: 'testCsv', maxCount: 1
        }, {
            name: 'testText', maxCount: 1
        }
    ]
);;

module.exports = upload