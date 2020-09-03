var TYPES = require('tedious').TYPES;

function indexRepository() {

    function getPing(req, res, next) {
        var response = {
            message: "ROUTES /, WORKING",
            status: 200,
            timestamp: new Date(),
        };

        res.send(response);
    }



    return {
        get: getPing

    }
}

module.exports = indexRepository;