const logger = require("../services/logger");

exports.insert = (app, req, resp) => {
    //TODO refactoring
    let conn = require("../persistence/connectionFactory");
    let model = require("../model/ModelDebits");
    let debitDAO = new app.persistence.DebitDAO();

    let debit = req.body;
    debit.debitedAt = new Date;

    debitDAO.insertDebit(debit, model(conn), (err, results) => {
        if (err) {
            resp.status(500).json({message: "Error in Receiving Debits"});
            logger.info(err);
            return;
        }
        logger.info(results);
        resp.status(200).json({message: "Debit Received"});        
        return;
    });
}

exports.find = (app, req, resp) => {

    let cardId = req.query.cardId;

    let conn = require("../persistence/connectionFactory");
    let model = require("../model/ModelDebits");
    let debitDAO = new app.persistence.DebitDAO();

    debitDAO.findDebit(cardId, model(conn), (err, results) => {
        if (err) {
            logger.info(err);
            resp.status(500).json({ message: "Error in the Search of Debits"});
            return;
        } else if (results == "" || typeof results === "undefined" || results == null) {
            logger.info("No Debit Found");
            resp.status(404).json({ message: "No Debit Found" });
            return;
        }
        else {
            logger.info(results);
            resp.status(200).json(results);
            return;
        }
    });
}