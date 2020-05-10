"use strict";
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    groceries = JSON.parse(fs.readFileSync('data/groceries.json', 'utf-8')),
    port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/dist/grocery-management'));
console.log(__dirname);


app.get('/api/groceries/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > groceries.length) {
        top = skip + (groceries.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedGroceries = groceries.slice(skip, top);
    res.setHeader('X-InlineCount', groceries.length);
    res.json(pagedGroceries);
});

app.get('/api/groceries', (req, res) => {
    res.json(groceries);
});

app.get('/api/groceries/:id', (req, res) => {
    let groceryId = +req.params.id;
    let selectedGrocery = null;
    for (let grocery of groceries) {
        if (grocery.id === groceryId) {
            // found grocery to create one to send
            selectedGrocery = {};
            selectedGrocery = grocery;
            break;
        }
    }
    res.json(selectedGrocery);
});

app.post('/api/groceries', (req, res) => {
    let postedGrocery = req.body;
    let maxId = Math.max.apply(Math, groceries.map((cust) => cust.id));
    postedGrocery.id = ++maxId;
    postedGrocery.gender = (postedGrocery.id % 2 === 0) ? 'female' : 'male';
    groceries.push(postedGrocery);
    res.json(postedGrocery);
});

app.put('/api/groceries/:id', (req, res) => {
    let putGrocery = req.body;
    let id = +req.params.id;
    let status = false;

    for (let i = 0, len = groceries.length; i < len; i++) {
        if (groceries[i].id === id) {
            groceries[i] = putGrocery;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/groceries/:id', function (req, res) {
    let groceryId = +req.params.id;
    for (let i = 0, len = groceries.length; i < len; i++) {
        if (groceries[i].id === groceryId) {
            groceries.splice(i, 1);
            break;
        }
    }
    res.json({ status: true });
});

app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/grocery-management/index.html');
});

app.listen(port);

console.log('Express listening on port ' + port);

//Open browser
var opn = require('opn');

opn('http://localhost:' + port).then(() => {
    console.log('Browser closed.');
});


