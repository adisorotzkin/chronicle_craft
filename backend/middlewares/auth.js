const jwt = require("jsonwebtoken");
const { config } = require("../config/secret.js");

exports.auth = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(400).json({ msg: "You are required to send an API key to the endpoint URL" });
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
        req.tokenData = decodeToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token invalid or expired. Try again" })
    }
}

exports.authAdmin = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send a token to this endpoint URL" })
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);

        if (decodeToken.role != "admin") {
            return res.status(401).json({ msg: "Token invalid or expired, code: 6A" })
        }
        req.tokenData = decodeToken;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({msg:"Token invalid or expired. Try logging in again"})
    }
}