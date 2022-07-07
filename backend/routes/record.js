const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// eslint-disable-next-line max-len
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.

// This section will help you get a list of all the records.
recordRoutes.route('/record').get((_req, res) => {
  const DBConnect = dbo.getDb('goldenyears');
  DBConnect.collection('dogs')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route('/dogs/:id').get((req, res) => {
  const DBConnect = dbo.getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  DBConnect.collection('dogs').findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// // This section will help you create a new record.
// recordRoutes.route('/neighborhoods/add').post((req, response) => {
//   const DBConnect = dbo.getDb();
//   const myobj = {
//     name: req.body.name,
//     position: req.body.position,
//     level: req.body.level
//   };
//   DBConnect.collection('neighborhoods').insertOne(myobj, (err, res) => {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// // This section will help you update a record by id.
// recordRoutes.route('/update/:id').post((req, response) => {
//   const DBConnect = dbo.getDb();
//   const myquery = { _id: ObjectId(req.params.id) };
//   const newvalues = {
//     $set: {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level
//     }
//   };
// });

// // This section will help you delete a record
// recordRoutes.route('/:id').delete((req, response) => {
//   const DBConnect = dbo.getDb();
//   const myquery = { _id: ObjectId(req.params.id) };
//   DBConnect.collection('neighborhoods').deleteOne(myquery, (err, obj) => {
//     if (err) throw err;
//     console.log('1 document deleted');
//     response.json(obj);
//   });
// });

module.exports = recordRoutes;
