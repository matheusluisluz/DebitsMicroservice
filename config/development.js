module.exports = {
  env: "development",
  db: "mongodb://digitalcurrency:digitalcurrency@digital-currency-shard-00-00-dduu3.mongodb.net:27017,digital-currency-shard-00-01-dduu3.mongodb.net:27017,digital-currency-shard-00-02-dduu3.mongodb.net:27017/Minute?ssl=true&replicaSet=digital-currency-shard-0&authSource=admin",
  port: process.env.PORT || 4000,
};