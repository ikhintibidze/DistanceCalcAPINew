module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define("owner", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: Sequelize.STRING
    },
    ownerName: {
      type: Sequelize.STRING
    },
    companyName: {
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
    email: {
      type: Sequelize.STRING
    },
    vechileId: {
      type: Sequelize.STRING
    }
  });

  return Owner;
};
