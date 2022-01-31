const mongoose = require('mongoose');

//connecting mongoose to mongodb
mongoose.connect('mongodb://localhost/task_list_db');

//establishing connection between mongoose and server
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Successfully connected to db');
})