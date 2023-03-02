const Joi = require('joi');

const scriptValidator = async (req, res, next) => {

    const schema = Joi.object({
        testName: Joi.string(),
        serverUrl: Joi.string(),
        method: Joi.string(),
        testDesc: Joi.string(),
        status: Joi.string().valid("Pass","Running").error(new Error("Status should be Pass or Running")),
        // environmentFile: Joi.string(),
        // testCsv: Joi.string(),       
    })

    try {
        const value = await schema.validateAsync(req.body);
        next()
    }
    catch (err) {
        return res.status(400).send({error:err.message})
    }
}

module.exports = scriptValidator