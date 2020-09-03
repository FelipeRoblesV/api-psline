function sendDbResponse(err, rowCount, data, callback) {
  if (err) {
    callback(err);
  } else {
    if (rowCount < 1) {
      callback(null, false);
    } else {

      callback(null, data, rowCount);
    }
  }
}

function buildRow(columns, data, isMultiSet) {

  if (isMultiSet == false) {
      columns.forEach(function (column) {
      data[column.metadata.colName] = column.value;
      });
  } else {
  columns.forEach(function (column) {
    var row = {};
    columns.forEach(function (column) {
      row[column.metadata.colName] = column.value;
    });
    data.push(row);
  });
  }


}

function initConfig(data) {

    var config = {
        server: data.host,
        authentication: {
            type: "default",
            options: {
                userName: data.user,
                password: data.password,
            },
        },
        options: {
            debug: {
                packet: true,
                data: true,
                payload: true,
                token: false,
                log: true,
            },
            database: data.database,
            encrypt: true, // for Azure users
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: false,
        },
    };

    return config;
}

function sendDbError(err, callback) {
  if (err) {
    callback(err);
  }
}



module.exports = {
  sendDbResponse: sendDbResponse,
  buildRow: buildRow,
  config: initConfig,
  sendDbError: sendDbError
};
