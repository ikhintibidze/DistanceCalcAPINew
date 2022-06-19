const db = require("../models");
const Vechile = db.vechile;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');



// Create and Save a new Vechile
exports.create = (req, res) => {

  // Validate request
  if (!req.body.vechileId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Vechile
  const vechile = {
    vechileId: req.body.vechileId,
    status: req.body.status,
    vechileType: req.body.vechileType,
    dockHigh: req.body.dockHigh,
    payload: req.body.payload,
    dimensions: req.body.dimensions,
    doorDimensions: req.body.doorDimensions,
    doorType: req.body.doorType,
    tempControl: req.body.tempControl,
    liftGate: req.body.liftGate,
    team: req.body.team,
    etrack: req.body.etrack,
    dateHired: req.body.dateHired,
    whoHired: req.body.whoHired,
    hazmatCertified: req.body.hazmatCertified,
    vinCode: req.body.vinCode,
    licenceState: req.body.licenceState,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    location: req.body.location,
    distance: req.body.distance,
    contactNumber: req.body.contactNumber,
    locationDateTime: req.body.locationDateTime,
    driverId: req.body.driverId,
    ownerId: req.body.ownerId,
    lockUser: req.body.lockUser,
    category: req.body.category,
    dispatch: req.body.dispatch,
    w9date: req.body.w9date,
    insuranceDate: req.body.insuranceDate,
    licenseDate: req.body.licenseDate
  };

  // Save Vechile in the database
  Vechile.create(vechile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vechile."
      });
    });
};

// Retrieve all Vechiles from the database.
exports.findAll = (req, res) => {
  const vechileId = req.query.vechileId;
  var condition = vechileId ? { vechileId: { [Op.like]: `%${vechileId}%` } } : null;

  Vechile.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vechiles."
      });
    });
};

// Find a single Vechile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vechile.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Vechile with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vechile with id=" + id
      });
    });
};

// Update a Vechile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vechile.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vechile was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vechile with id=${id}. Maybe Vechile was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vechile with id=" + id
      });
    });
};

// Delete a Vechile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vechile.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vechile was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vechile with id=${id}. Maybe Vechile was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vechile with id=" + id
      });
    });
};

// Delete all Vechiles from the database.
exports.deleteAll = (req, res) => {
  Vechile.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Vechiles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vechiles."
      });
    });
};

// find all published Vechile
exports.findAllPublished = (req, res) => {
  Vechile.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vechiles."
      });
    });
};


async function getTrack(trackID) {
  const track = await Track.findByPk(trackID);
  console.log('track', track);
}




/*
const calculateDistance = async (src, dst) => {

  let query = "Select calculate_distance_func(:p1,:p2) as distance from dual";
  let seqOptions = {
    replacements: { p1: src, p2: dst },
    type: QueryTypes.SELECT
  }

  const dist = await db.sequelize.query(query, seqOptions);

  return dist;

};


const assignDistance = async (data, dst, radius) => {
  var myData = [];
  for (let val of data) {
    const res = await calculateDistance(val.location, dst);
   
    const obj = JSON.parse(JSON.stringify(res));
   
    val.distance = obj[0].distance;
   
    if (val.distance<radius)  myData.push(val);
  }

  return myData;
}


const getAllVechiles = async () => {

  const data = await Vechile.findAll();
  return data;

}

*/

const getCalculatedVechiles = async (dst, radius) => {

  let query = "select * from (select distancecalcdb.calculate_distance_func(:p1,v.location) as dist," + 
              "v.vechileId as vechileId,"+
              "v.Status as status,"+
              "v.VechileType as vechileType,"+
              "v.DockHigh as dockHigh,"+
              "v.Payload as payload,"+
              "v.Dimensions as dimensions,"+
              "v.DoorDimensions as doorDimensions,"+
              "v.DoorType as doorType,"+
              "v.TempControl as tempControl,"+
              "v.LiftGate as liftGate,"+
              "v.Team as team,"+
              "v.Etrack as etrack,"+
              "v.DateHired as dateHired,"+
              "v.WhoHired as whoHired,"+
              "v.HazmatCertified as hazmatCertified,"+
              "v.LicenceState as licenceState,"+
              "v.VechileMake as vechileMake,"+
              "v.Model as model,"+
              "v.Year as year,"+
              "v.Color as color,"+
              "v.Location as location,"+
              "v.Distance as distance,"+
              "v.ContactNumber as contactNumber,"+
              "v.LocationDateTime as locationDateTime,"+
              "v.AvailableNote as availableNote,"+
              "v.DriverId as driverId,"+
              "v.OwnerId as ownerId,"+
              "v.StatusId as statusId,"+
              "v.LockDateTime as lockDateTime,"+
              "v.RecordStatus as recordStatus,"+
              "v.LockUser as lockUser,"+
              "v.Category as category,"+
              "v.Dispatch as dispatch,"+
              "v.W9date as w9date,"+
              "v.InsuranceDate as insuranceDate,"+
              "v.VechRegDate as vechRegDate,"+
              "v.LicenseDate as licenseDate "+
              "from distancecalcdb.vechiles v) p  where p.dist<:p2 ";

  let seqOptions = {
    replacements: { p1: dst, p2: radius },
    type: QueryTypes.SELECT
  }

  const result = await db.sequelize.query(query, seqOptions);

  return result;

};





exports.getAllCalculated = async (req, res) => {

  let dst = req.params.dst;
  let radius = req.params.radius;
  var vechiles = [];
  vechiles = await getCalculatedVechiles(dst,radius);
  res.send(vechiles);
 
 /* vechiles = await getAllVechiles();
  distancedVechiles = await assignDistance(vechiles, dst, radius);
  res.send(distancedVechiles);*/
};

const updateVechileStatus = async (rcId,vStatus,vUser) => {

  let query = "select distancecalcdb.update_status_func(:recId, :vechStatus, :recLockUser) from dual";

  let seqOptions = {
    replacements: { recId: rcId, vechStatus: vStatus, recLockUser: vUser },
    type: QueryTypes.SELECT
  }

 
   const rs = await db.sequelize.query(query, seqOptions);
   return rs;
  
};

// Update a Vechile by the id in the request
exports.updateStatus = async (req, res) => {

  let id = req.params.id;
  let statId = req.params.statusId;
  let statUser = req.params.statusUser;
  
  if (req.params.statusUser==="free") statUser="";
  
  var r = [];
  
  r = await updateVechileStatus(id,statId,statUser);
  
  res.send(r);
  
};






