module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define("driver", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    driverId: {
      type: Sequelize.STRING
    },
    driverName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    homePhone: {
      type: Sequelize.STRING
    },
    emergencyPhone: {
      type: Sequelize.STRING
    },
    emailAddress: {
      type: Sequelize.STRING
    },
    usCitizen: {
      type: Sequelize.STRING
    },
    greenCard: {
      type: Sequelize.STRING
    },
    canCrossBorder: {
      type: Sequelize.STRING
    },
    tsa: {
      type: Sequelize.STRING
    },
    tweaktwi: {
      type: Sequelize.STRING
    },
    vechileId: {
      type: Sequelize.STRING
    }
  });

  return Driver;
};
