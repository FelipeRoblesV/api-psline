const IndexRepository = require('./index.repository');

module.exports = function (router) {

    const indexRepository = IndexRepository();

    router.route('/').get(indexRepository.get);

}
