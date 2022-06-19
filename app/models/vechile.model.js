module.exports = (sequelize, Sequelize) => {
  const Vechile = sequelize.define("vechile", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vechileId: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    vechileType: {
      type: Sequelize.STRING
    },
    dockHigh: {
      type: Sequelize.STRING
    },
    payload: {
      type: Sequelize.STRING
    },
    dimensions: {
      type: Sequelize.STRING
    },
    doorDimensions: {
      type: Sequelize.STRING
    },
    doorType: {
      type: Sequelize.STRING
    },
    tempControl: {
      type: Sequelize.STRING
    },
    liftGate: {
      type: Sequelize.STRING
    },
    team: {
      type: Sequelize.STRING
    },
    etrack: {
      type: Sequelize.STRING
    },
    dateHired: {
      type: Sequelize.STRING
    },
    whoHired: {
      type: Sequelize.STRING
    },
    hazmatCertified: {
      type: Sequelize.STRING
    },
    vinCode: {
      type: Sequelize.STRING
    },
    licenceState: {
      type: Sequelize.STRING
    },
    vechileMake: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    distance: {
      type: Sequelize.STRING
    },
    contactNumber: {
      type: Sequelize.STRING
    },
    locationDateTime: {
      type: Sequelize.STRING
    },
    availableNote: {
      type: Sequelize.STRING
    },
    driverId: {
      type: Sequelize.STRING
    },
    ownerId: {
      type: Sequelize.STRING
    },
    statusId: {
      type: Sequelize.STRING
    },
    lockDateTime: {
      type: Sequelize.STRING
    },
    recordStatus: {
      type: Sequelize.STRING
    },
    lockUser: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    dispatch: {
      type: Sequelize.STRING
    },
    w9date: {
      type: Sequelize.STRING
    },
    insuranceDate: {
      type: Sequelize.STRING
    },
    vechRegDate: {
      type: Sequelize.STRING
    },
    licenseDate: {
      type: Sequelize.STRING
    }
  });

  return Vechile;
};
