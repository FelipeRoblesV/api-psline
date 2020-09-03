const SearchProductsRepository = require('./search-products.repository');

module.exports = function (router, routes) {

    const searchProductsRepository = SearchProductsRepository();

    router.route(routes + '/search/products/put').put(searchProductsRepository.put);

}
