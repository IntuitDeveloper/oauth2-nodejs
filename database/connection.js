let mongoose = require('mongoose');
const database = 'myFirstDatabase';  
const username = '76east'; 
const passwd = 'uyXCXzZY6gDJ7kKC';     // REPLACE WITH YOUR DB NAME


const connectionString = "mongodb+srv://"+username+":"+passwd+"@accounting-cluster.orprm.mongodb.net/"+database+"?retryWrites=true&w=majority";
const connector= mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})



module.exports = connector;