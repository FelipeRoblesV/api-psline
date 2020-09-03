const _loginRepository = require('./login.repository');

module.exports = function (router) {

        var loginRepository = _loginRepository();
        router.route('/login/put').put(loginRepository.put);

}   