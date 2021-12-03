const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/guest", controller.allAccess);

  app.get(
    "/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};