let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

function isValidId(id, res) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: "Invalid ID"});
        return false;
    }
    return true;
}

function isAdmin(req) {
    if (!req.headers.authorization)
        return res.status(401).json({});
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    return (decoded.payload.user.role == "admin");
}

module.exports = {
    isValidId,
    isAdmin
};
