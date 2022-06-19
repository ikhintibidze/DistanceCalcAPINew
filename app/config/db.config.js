module.exports = {
  HOST: "metrodb.mysql.database.azure.com",
  USER: "metroadmin",
  PASSWORD: "Mtl12345!",
  DB: "distancecalcdb",
  PORT: "3306",
  dialect: "mysql",
  dialectOptions: {
    multipleStatements: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
