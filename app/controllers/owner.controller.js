const db = require("../models");
const Owner = db.owner;
const Op = db.Sequelize.Op;

// Create and Save a new Owner
exports.create = (req, res) => {

  // Validate request
  if (!req.body.ownerId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a Owner
  const owner = {
    ownerId: req.body.ownerId,
    ownerName: req.body.ownerName,
    companyName: req.body.companyName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    homePhone: req.body.homePhone,
    emergencyPhone: req.body.emergencyPhone,
    email: req.body.email,
    vechileId: req.body.vechileId
  };

  // Save Owner in the database
  Owner.create(owner)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Owner."
      });
    });
};

// Retrieve all Owners from the database.
exports.findAll = (req, res) => {
  const ownerId = req.query.ownerId;
  var condition = ownerId ? { ownerId: { [Op.like]: `%${ownerId}%` } } : null;

  Owner.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving owners."
      });
    });
};

// Find a single Owner with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Owner.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Owner with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Owner with id=" + id
      });
    });
};

// Update a Owner by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Owner.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Owner was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Owner with id=${id}. Maybe Owner was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Owner with id=" + id
      });
    });
};

// Delete a Owner with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Owner.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Owner was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Owner with id=${id}. Maybe Owner was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Owner with id=" + id
      });
    });
};

// Delete all Owners from the database.
exports.deleteAll = (req, res) => {
  Owner.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Owners were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all owners."
      });
    });
};

// find all published Owner
exports.findAllPublished = (req, res) => {
  Owner.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving owners."
      });
    });
};
