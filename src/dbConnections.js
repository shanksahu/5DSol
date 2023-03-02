const mongoose = require('mongoose')
const uri = process.env.DEVDATABASE
mongoose.set("strictQuery", false);
module.exports = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("Database connected!")
    })
    .catch(err => console.log(err));