
var path = require('path');
var appDir = path.dirname(require.main.filename);

var response = require("shared");
var TYPES = require("tedious").TYPES;
const connection = require('database');
const dbContext = require('database/dbContext');
const databaseDefault = require(appDir + '/config');


function LoginRepository() {


  function putLogin(req, res, next) {

    var _connection = new connection(databaseDefault.dbDefault);
    var _dbContext = new dbContext(_connection);

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

      var query = "select  top 1 count(*) as 'total' from [dbo].[user] as u join [dbo].[database] as d on u.id_database = d.id where(u.[email] = @email and CONVERT(VARCHAR(MAX), DECRYPTBYPASSPHRASE('password-posline', u.[password])) = @password)";

      var message = {
        error: "Usuario existe",
        success: "Usuario no existe."
      }

      _dbContext.getQuery(query, parameters, function (error, data, rowCount) {

        return res.send(response(data, error, message));

      });

    }
  }

  return {
    put: putLogin,
  };

}

module.exports = LoginRepository;