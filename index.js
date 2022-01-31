const express =  require('express');
const port = 8000;
const app = express();

const db = require('./config/mongoose');
const Task = require('./models/task');

//setting view engine as express and defining path
app.set('view engine','ejs');
app.set('views','./views');

//middleware
app.use(express.urlencoded({ extended: true }));

//middleware for using static files
app.use(express.static('assets'));

//controller for rendering home page
app.get('/',function(req,res){

    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"To-Do App",
            task_list: task
        });
    });
});

//controller for creating task
app.post('/create-task',function(req,res){
    Task.create(req.body, function(err, newTask){
        if(err){console.log('error in creating a task!');
    return;}

    console.log("",newTask);
    return res.redirect('back');
    });
});

//controller for deleting a task
app.get('/delete-task',function(req,res){
    let id = req.query.id;
    Task.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});


//setting up the server
app.listen(port,function(err){
    if(err){
        console.log(`Error occured while setting up the server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});