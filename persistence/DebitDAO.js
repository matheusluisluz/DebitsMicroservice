const logger = require("../services/logger");
class DebitDAO {
    insertDebit(data, model, callback) {
        var debit = new model(data);
        debit.save(callback);
        logger.info("Inserindo Débito");
    }
    findDebit(id, model, callback) {
        model.find({ "cardId": id }, "id debitedAt value", callback);
        logger.info("Consultando Débitos");
    }
}

module.exports = () => DebitDAO;