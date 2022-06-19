const { authJwt } = require("../middleware");
const controller = require("../controllers/owner.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/owner/all", controller.findAll);

  app.get("/api/owner/:id", controller.findOne);

  app.put("/api/owner/:id",controller.update);

  app.delete("/api/owner/:id",controller.delete);

  app.post("/api/owner/add",controller.create);
};