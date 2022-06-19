const { authJwt } = require("../middleware");
const controller = require("../controllers/driver.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/driver/all", controller.findAll);

  app.get("/api/driver/:id", controller.findOne);

  app.put("/api/driver/:id",controller.update);

  app.delete("/api/driver/:id",controller.delete);

  app.post("/api/driver/add",controller.create);
};