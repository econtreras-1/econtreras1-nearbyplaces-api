//Update
require('dotenv').config();
const { Pool } = require('pg');

let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.mydbusername;
let password = process.env.password;


let connectionString =
`postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

// Methods for calls

//Add addPlace to Database
let addPlace = (name, address, image) => {
    console.log(connectionString)
    let sql = `insert into mynearbyplaces.businesses(name, image, address) values ($1, $2, $3)`;
    console.log(sql);
    return pool.query(sql, [name, image, address])
    .then(() => console.log('the place was saved!'));
    
}

//Add Reviews to Database
let addReview = (name, business, review, rating) => {
    console.log(connectionString)
    let sql = `insert into mynearbyplaces.reviews(name, business, review, rating) values ($1, $2, $3, $4)`;
    console.log(sql);
    return pool.query(sql, [name, business, review, rating])
    .then(() => console.log('the review was saved!'));
    
}

//Retrieve Places from Database
let getPlaces = () => {
    console.log(connectionString)
    let sql = `select * from mynearbyplaces.businesses`
    return pool.query(sql)
    .then(result => result.rows);
}

//Retrieve Reviews from Database
let getReviews = () => {
    console.log(connectionString)
    let sql = `select * from mynearbyplaces.reviews`
    return pool.query(sql)
    .then(result => result.rows);

}

//Remove Place from Database
let deletePlace = (id) => {
    console.log(connectionString)
    let sql = `DELETE FROM mynearbyplaces.businesses WHERE id=$1`;
    return pool.query(sql, [id])
    .then(() => console.log('the place was deleted!'));
}

//Modify Place from Database
let editPlace = (name, address, image, id) => {
    console.log(connectionString)
    let sql = `UPDATE mynearbyplaces.businesses
    SET name = $1, address = $2, image = $3 WHERE id = $4;`;
    return pool.query(sql, [name, address, image, id])
    .then(() => console.log('the place was edited!'));
}

module.exports = {addPlace, addReview, getPlaces, getReviews, deletePlace, editPlace}
