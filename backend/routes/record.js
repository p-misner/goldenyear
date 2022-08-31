const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as middleware and takes control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

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

// all records from dogRecords
recordRoutes.route('/dogRecords').get((req, res) => {
  const DBConnect = dbo.getDb('goldenyears');
  DBConnect.collection('dogDetails')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
// should get from dogDetails database
recordRoutes.route('/dogRecords/:dogName').get((req, res) => {
  const DBConnect = dbo.getDb();
  const secondquery = { dogName: req.params.dogName };
  DBConnect.collection('dogDetails').findOne(secondquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = recordRoutes;
