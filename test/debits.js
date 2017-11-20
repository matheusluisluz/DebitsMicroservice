var app = require("../config/custom");
var chai = require('chai');
var req = require("supertest")(app);

var expect = chai.expect;
var assert = chai.assert;

var debits = {
    cardId: "9999-9999",
    code: "9999-999",
    value: 99
};

var debitsField = {
    cardId: "9999-9999",

    value: 99
};

describe("API Integration Tests", () => {
    describe("#GET debit-controller", () => {
        it("#consulta pelo cardId -- mongoService", (done) => {
            req.get("/debits?cardId=" + debits.cardId).end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    describe("#GET debit-controller", () => {
        it("#consulta pelo cardId inexistente -- mongoService", (done) => {
            req.get("/debits?cardId=" + app.request.query).end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(404);
                expect(res.body.message).to.equal("No Debit Found");
                done();
            });
        });
    });

    describe("#GET debit-controller", () => {
        it("#consulta pelo cardId vazio -- validationService", (done) => {
            req.get("/debits?cardId=").end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(422);
                done();
            });
        });
    });

    describe("#GET debit-controller", () => {
        it("#consulta pela ausencia de queryString -- validationService", (done) => {
            req.get("/debits").end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(422);
                done();
            });
        });
    });

    describe("#POST debit-controller", () => {
        it("#insercao de debito -- validationService", (done) => {
            req.post("/debits").send(debits).end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(200);

                assert.isNotNull(debits.cardId, "CardId não poder ser null");
                assert.isNotEmpty(debits.cardId, "CardId não poder ser vazio");
                assert.isString(debits.cardId);

                assert.isNotNull(debits.code, "code não poder ser null");
                assert.isNotEmpty(debits.code, "code não poder ser vazio");
                assert.isString(debits.code);

                assert.isNotNull(debits.value, "value não poder ser null");
                assert.isNumber(debits.value);

                done();
            });
        });
    });

    describe("#POST debit-controller", () => {
        it("#insercao de debito com campos ausentes-- validationService", (done) => {
            req.post("/debits").send(debitsField).end((err, res) => {
                expect("Content-Type", /json/);
                expect(res.statusCode).to.equal(422);

                assert.isNotNull(debits.cardId, "CardId não poder ser null");
                assert.isNotEmpty(debits.cardId, "CardId não poder ser vazio");
                assert.isString(debits.cardId);

                assert.isNotNull(debits.code, "code não poder ser null");
                assert.isNotEmpty(debits.code, "code não poder ser vazio");
                assert.isString(debits.code);

                assert.isNotNull(debits.value, "value não poder ser null");
                assert.isNumber(debits.value);

                done();
            });
        });
    });
});