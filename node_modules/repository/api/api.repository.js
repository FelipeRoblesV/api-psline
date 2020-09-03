var TYPES = require('tedious').TYPES;

function apiRepository() {

    function getPing(req, res, next) {
        var response = {
            message: "ROUTES /API, WORKING",
            status: 200,
            timestamp: new Date(),
        };

        res.send(response);
    }



    return {
        get: getPing

    }
}

module.exports = apiRepository;