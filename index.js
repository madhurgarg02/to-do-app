const express =  require('express');
const path = require('path');
const port = 8000;
const app = express();

const db = require('./config/mongoose');
const Task = require('./models/task');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

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

app.post('/create-task',function(req,res){
    Task.create(req.body, function(err, newTask){
        if(err){console.log('error in creating a task!');
    return;}

    console.log("",newTask);
    return res.redirect('back');
    });
});

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



app.listen(port,function(err){
    if(err){
        console.log(`Error occured while setting up the server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});