// This is the server file

// dependencies
const express = require('express');
const cors = require('cors');
const db = require('./db');
const data = require('./data');

// create the server
const app = express();
const port = process.env.PORT || 4002;

// parse json
app.use(express.json());
app.use(cors());

//Add Places
app.post('/addPlace', (request, response) => {
   db.addPlace(request.body.name, request.body.address, request.body.image)
   .then(places => response.json(places))
   .catch(e => response.status(500).send("There was an error in saving the place"));
});

//Add Reviews
app.post('/addReview', (request, response) => {
   db.addReview(request.body.name, request.body.business, request.body.review, request.body.rating)
   .then(reviews => response.json(reviews))
   .catch(e => {console.log(e); response.status(500).send('There was an error in saving the review')})
});

// Get all of the places
app.get('/places', (request, response) => {
    db.getPlaces()
    .then(places =>response.json(places))
    .catch(e => {console.log(e); response.status(500).send("There was an error in finding the places")});
});

//Get all of the Reviews
app.get('/reviews', (request, response) => {
    db.getReviews()
    .then(places =>response.json(places))
    .catch(e => {console.log(e); response.status(500).send("There was an error in finding the places")});
});

//Delete Place
app.post('/deletePlace', (request, response) => {
   db.deletePlace(request.body.id)
   .then(places => response.json(places))
   .catch(e => {console.log(e); response.status(500).send('there was an error in delete the place')})
});

//Edit Place
app.post('/editPlace', (request, response) => {
   db.editPlace(request.body.name, request.body.address, request.body.image, request.body.id)
   .then(places => response.json(places))
   .catch(e => {console.log(e); response.status(500).send('there was an error in editing the place')})
});

 app.get('/', (request, response) => {
    response.send("Welcome to econtreras-1-mynearbyplaces server side");
 });


app.listen(port, () => console.log("listening on port " + port))