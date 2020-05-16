var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://test:test@todo-5grlj.mongodb.net/test')

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
var urlencoderParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos: data})
    })
});

app.post('/todo', urlencoderParser, function(req, res){
    //get data from view and pass it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item', function(req, res){
    //delete the requested item from the mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    })
});

};