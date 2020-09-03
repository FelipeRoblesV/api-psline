var path = require('path');
var appDir = path.dirname(require.main.filename);

const databaseDefault = require(appDir + '/config');

var utility = require("utility");

class dbContext {

    constructor() {}

    getQuery(query, params, callback) {

        try {
         var Connection = require("tedious").Connection;
         var Request = require('tedious').Request;

         var config = utility.config(databaseDefault.dbDefault);
         var connection = new Connection(config);
         var data = {};
         var dataset;

         var data = {};
         var dataset;

         connection.on('connect', function (err) {

             if (err) {
                 utility.sendDbError(err, callback);
             } else {

                 var request = new Request(query, function (err, rowCount) {
                     utility.sendDbResponse(err, rowCount, dataset, callback);
                     connection.close();
                 });

                 request.on("row", function (columns) {
                     utility.buildRow(columns, data);
                 });

                 request.on('doneInProc', function (rowCount, more, rows) {
                     dataset = data;
                     data = [];
                 });

                 params.forEach((param) => {
                     request.addParameter(param.name, param.type, param.val);
                 });

                 connection.execSql(request);
             }

         });
        } catch (error) {
            utility.sendDbError(error, callback);
        }

    }

    getQuery_withDatabase(_query, params, isMultiSet, callback) {

        try {
            var Connection = require("tedious").Connection;
            var Request = require('tedious').Request;

            var config = utility.config(databaseDefault.dbDefault);
            var connection = new Connection(config);
            var data = {};
            var dataset;

            connection.on('connect', function (err) {
                if (err) {
                    utility.sendDbError(err, callback);
                } else {

                    var query = "select  top 1 d.[host] as 'host', d.[database] as 'database' ,d.[user] as 'user', CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE('password-posline', d. [password])) as 'password' from [dbo].[user] as u join [dbo].[database] as d on u.id_database = d.id where(u.[email] = @email and CONVERT(VARCHAR(MAX), DECRYPTBYPASSPHRASE('password-posline', u.[password])) = @password)";

                    var request = new Request(query, function (err, rowCount) {
                        var _config = utility.config(dataset);
                        var _connection = new Connection(_config);
                        var _data = [];
                        var _dataset;


                        _connection.on('connect', function (err) {

                            if (err) {
                                utility.sendDbError(err, callback);
                            } else {


                                var _request = new Request(_query, function (err, rowCount) {
                                    utility.sendDbResponse(err, rowCount, _dataset, callback);
                                });

                                _request.on("row", function (columns) {
                                    utility.buildRow(columns, _data, isMultiSet);
                                });

                                _request.on('doneInProc', function (rowCount, more, rows) {
                                    if (isMultiSet == false) {
                                        _dataset = _data;
                                        _data = [];
                                    } else {
                                        _dataset = [];
                                        _dataset.push(_data);
                                        _data = [];
                                    }
                                });

                                params.forEach((param) => {
                                    _request.addParameter(param.name, param.type, param.val);
                                });

                                _connection.execSql(_request);
                            }
                        });

                    });

                    request.on("row", function (columns) {
                        utility.buildRow(columns, data, false);
                    });

                    request.on('doneInProc', function (rowCount, more, rows) {
                        dataset = data;
                        data = [];
                    });

                    params.forEach((param) => {
                        request.addParameter(param.name, param.type, param.val);
                    });

                    connection.execSql(request);

                }
            });
        } catch (error) {
            utility.sendDbError(err, callback);
        }
    }

}


module.exports = dbContext;