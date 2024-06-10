const passwordRegex=/^(?=.*[A-Z]).{6,}$/
const CustomError=require('../midilwares/customError')


module.exports = (req, res, next) => {
    if (passwordRegex.test(req.body.password)) {
        next();
    } else {
        throw new CustomError("Your password must be at least 6 characters long and include a capital letter.", 403);
    }
};