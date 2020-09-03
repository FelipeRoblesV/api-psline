module.exports = function (data, error, message) {

    var callback = [];
    if (error) {
        callback = {
            status: 500,
            error: error,
            message: message.error,
            timestamp: new Date(),
        }
    } else {
        callback = {
            status: 200,
            data: data,
            message: message.success,
            timestamp: new Date(),
        }
}
return callback;
}