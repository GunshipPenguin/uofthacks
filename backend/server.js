const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('kismet-sqlite3.sqlite3');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/api/devices', (req, res) => {
    db.all("SELECT first_time, last_time, devmac, strongest_signal, bytes_data FROM devices WHERE type <> 'Wi-Fi AP' ORDER BY last_time", (err, rows) => {
        res.send(rows);
    });
});

app.get('/api/packets/:mac', (req, res) => {
    const mac = req.params.mac;
    db.all("SELECT ts_sec, sourcemac, destmac, frequency, datasources.name as nodename FROM packets JOIN datasources ON datasources.uuid=packets.datasource WHERE sourcemac = ?", [mac], (err, rows) => {
        res.send(rows);
    })

});

app.listen(8080, () => console.log(`Listening on port 8080`));
