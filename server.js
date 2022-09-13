const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(require('./backend/routes/record'));
// get driver connection
const dbo = require('./backend/db/conn');

// if (process.env.NODE_ENV === 'production') {
//   // app.use(express.static(path.join(__dirname, '../build/')));
// }

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer((err) => {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
