const express = require("express");

function eRoutes() {
  const router = express.Router();
  var index = require("repository/index/index.routes")(router);

  return router;
}

module.exports = eRoutes;

