const service = require("../services/ValidationService");
const serviceDAO = require("../services/MongoService");
const logger = require("../services/logger");

module.exports = (app) => {

    app.get("/debits", service.validateCardId, (req, resp, next) => {
        logger.info("Entrando no GET");
        serviceDAO.find(app, req, resp);
    });

    app.post("/debits", service.validate, (req, resp, next) => {
        logger.info("Entrando no POST");
        serviceDAO.insert(app, req, resp);
    });
}