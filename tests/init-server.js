'use strict';

const express = require('express');
const app = express();

app.get('/url1', function(req, res) {
    setTimeout(function() {
        res.end('hello world one');
    }, 1000);
});

app.get('/url2/', function(req, res) {
    setTimeout(function() {
        res.end('hello world two');
    }, 1500);
});

exports.create = function() {
    return app;
}
