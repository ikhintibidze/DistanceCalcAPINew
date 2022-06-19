const { authJwt } = require("../middleware");
const controller = require("../controllers/vechile.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/vechile/all", controller.findAll);

  app.get("/api/vechile/:id", controller.findOne);

  app.put("/api/vechile/:id",controller.update);

  app.put("/api/vechile/status/:id/:statusId/:statusUser",controller.updateStatus);

  app.delete("/api/vechile/:id",controller.delete);

  app.post("/api/vechile/add",controller.create);

 // app.get("/api/vechile/:src/:dst", controller.calculateDistance);

  app.get("/api/vechile/:dst/:radius", controller.getAllCalculated);
};
