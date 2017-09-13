/**
 * Created by Joao on 16/05/2017.
 */
var express = require('express');

var app = module.exports = express.Router();

app.get('/api/data', function(req, res) {
    res.status(200).send(JSON.stringify({
        "fixture": "Ronda 1",
        "matches": [
            {
                "homeTeam": "Nacional",
                "awayTeam": "Chaves",
                "score": "0 : 1",
                "stats": {
                    "avgGols": "4.00",
                    "BTTS": "100%",
                    "Over1.5": "100%",
                    "Over2.5": "100%",
                    "Over3.5": "100%",
                    "Over4.5": "100%"
                }
            }]
    }));
});
