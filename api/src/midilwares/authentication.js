
const tokenModel = require('../models/token');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const tokenData = authorizationHeader.split(' ');

        if (tokenData[0] === "Token") {
            try {
                const tokenFind = await tokenModel.findOne({ token: tokenData[1] }).populate("userId");
                
                if (tokenFind) {
                    req.user = tokenFind.userId;
                }
                
                next();
            } catch (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (tokenData[0] === "Bearer") {
            jwt.verify(tokenData[1], process.env.AccessKey, (err, userData) => {
                if (err) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                req.user = userData;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
};
