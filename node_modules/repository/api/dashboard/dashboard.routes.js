module.exports = function (router) {
    var routes = "/dashboard";
    var search_products = require("./repository/search/products/search-products.routes")(router, routes);

}
