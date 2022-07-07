/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let _db;

module.exports = {
  connectToServer(callback) {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('goldenyears');
        console.log('Successfully connected to MongoDB.');
        console.log(_db);
      }
      return callback(err);
    });
  },

  getDb() {
    return _db;
  }
};
