var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Aikyn'
    },
    {
        id: 3,
        name: 'Kairat Nurtas'
    }
];


app.get('/', function (req, res){
    res.send('Hello API');
})

app.get('/artists', function (req, res) {
    db.collection('artist').find().toArray(function (err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/artists/:id', function(req, res){
    console.log(req.params);
    var artist = artists.find(function(artist){
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
})

app.post('/artists', function(req, res){
    var artist = {
        name: req.body.name
    };
    db.collection('artists').insert(artist, function(err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
})

app.put('/artists/:id', function(req, res){
    var artist = artists.find(function (artist){
        return artist.id === Number(req.params.id)
    });
    artist.name = req.body.name;
    res.sendStatus(200);
})

app.delete('/artists/:id', function(req, res){
    artists = artists.filter(function (artist){
        return artist.id !== Number(req.params.id);
    });
    res.sendStatus(200);
})


MongoClient.connect('mongodb://localhost:27017/myapi', function(err, database){
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3012, function() {
        console.log('API app started');
    })
})