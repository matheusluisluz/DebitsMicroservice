const logger = require("../services/logger");

exports.validate = (req, resp, next) => {//"cardId": "000-111", "code": "4779-10P", "value": 100

    logger.info("Entrando no serviço de Validação");

    req.assert("cardId", "Id do Cartão Obrigatório").notEmpty({ mapped: false });
    req.assert("code", "Código da Linha Obrigatório").notEmpty({ mapped: false });
    req.assert("value", "Valor do Débito Obrigatório").notEmpty({ mapped: false });

    const errors = req.validationErrors();

    if (errors) {
        return resp.status(422).json({ errors: errors });
    }
    logger.info("Saindo no serviço de Validação");
    next();
}

exports.validateCardId = (req, resp, next) => {

    req.checkQuery("cardId", "Id do Cartão Obrigatório").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return resp.status(422).json({ errors: errors });
    }
    next();
}