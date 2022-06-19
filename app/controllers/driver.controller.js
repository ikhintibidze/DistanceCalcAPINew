const db = require("../models");
const Driver = db.driver;
const Op = db.Sequelize.Op;

// Create and Save a new Driver
exports.create = (req, res) => {

  // Validate request
  if (!req.body.driverId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a Driver
  const driver = {
    driverId: req.body.driverId,
    driverName: req.body.driverName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    homePhone: req.body.homePhone,
    emergencyPhone: req.body.emergencyPhone,
    emailAddress: req.body.emailAddress,
    usCitizen: req.body.usCitizen,
    greenCard: req.body.greenCard,
    canCrossBorder: req.body.canCrossBorder,
    tsa: req.body.tsa,
    tweaktwi: req.body.tweaktwi,
    vechileId: req.body.vechileId
  };

  // Save Driver in the database
  Driver.create(driver)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Driver."
      });
    });
};

// Retrieve all Drivers from the database.
exports.findAll = (req, res) => {
  const driverId = req.query.driverId;
  var condition = driverId ? { driverId: { [Op.like]: `%${driverId}%` } } : null;

  Driver.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drivers."
      });
    });
};

// Find a single Driver with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Driver.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Driver with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Driver with id=" + id
      });
    });
};

// Update a Driver by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Driver.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Driver was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Driver with id=${id}. Maybe Driver was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Driver with id=" + id
      });
    });
};

// Delete a Driver with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Driver.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Driver was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Driver with id=${id}. Maybe Driver was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Driver with id=" + id
      });
    });
};

// Delete all Drivers from the database.
exports.deleteAll = (req, res) => {
  Driver.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Drivers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all drivers."
      });
    });
};

// find all published Driver
exports.findAllPublished = (req, res) => {
  Driver.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drivers."
      });
    });
};
