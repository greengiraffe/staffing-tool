let mongoose = require('mongoose');

function isValidId(id, res) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: "Invalid ID"});
        return false;
    }
    return true;
}

module.exports = {
    isValidId
};
