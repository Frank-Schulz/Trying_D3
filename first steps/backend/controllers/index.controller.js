const asyncHandler = require('express-async-handler');
const People = require('../models/people.model');

// const generateAncestry = require('../seeder/ancestryGenerator')

//@description      GET home page
//@route            GET /
//access            Public
const getIndex = (req, res, next) => {
  People.find({})
    .then((products) => { res.send(products) })
    .catch((error) => { next(error); });
}

module.exports = {
  getIndex,
}
