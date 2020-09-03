const ApiRepository = require('./api.repository');

module.exports = function (router) {

    const apiRepository = ApiRepository();

    router.route('/').get(apiRepository.get);

}
