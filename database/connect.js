var Connection = require("tedious").Connection;
var utility = require("utility");

var config;
var connection;

class Connect {
    constructor(data) {
        config = utility.config(data);


        try {
             connection = new Connection(config);
        } catch (error) {
            connection.close();
        }
    }

    getConnect() {

                connection.on("connect", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Conectado Correctamente.");
                    }
                });

        return connection;
    }

}



module.exports = Connect;
