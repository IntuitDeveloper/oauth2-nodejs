const config = require("../config.json")
const mongoose = require('mongoose');
const URI = config.mongodb_URI || 5000;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},err => {
    if(err) throw err;
    console.log(`Connected to mongoDB`);
});