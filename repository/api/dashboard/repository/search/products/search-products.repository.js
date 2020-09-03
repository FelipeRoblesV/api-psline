var TYPES = require("tedious").TYPES;
var response = require("shared");
var dbContext = require('database/dbContext');

var path = require('path');
var appDir = path.dirname(require.main.filename);
const databaseDefault = require(appDir + '/config');

function SearchProductsRepository() {

    function putSearchProducts(req, res, next) {

        var _dbContext = new dbContext();
        if (req.body.email && req.body.password) {

            var parameters = [];

            parameters.push({
                name: "email",
                type: TYPES.VarChar,
                val: req.body.email,
            });

            parameters.push({
                name: "password",
                type: TYPES.VarChar,
                val: req.body.password,
            });

            var query = "select * from [dbo].MAE_PRODUCTO_SERVICIO";

            var message = {
                error: "Error al buscar un producto",
                success: "La busqueda se hizo correctamente"
            }


            _dbContext.getQuery_withDatabase(query, parameters,true, function (error, data, rowCount) {
            return res.send(response(data, error, message));
            });
        }
    }

    return {
        put: putSearchProducts,
    };

}

module.exports = SearchProductsRepository;