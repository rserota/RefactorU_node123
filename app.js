                                                                                                                   
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list)
app.get('/hi', function(request, response){
    response.send('word to your mother')
})

app.post('/yo', function(request, response){
    response.send('yo dawg')
})

app.get('/where', function(request, response){
    response.send('where you at')
})

app.all ('/home', function(request, response){
    fs.readFile(__dirname + '/index.html', function(error,data){
        response.setHeader('Content-Type', 'text/html')
        response.send(data)
    })
})

app.post('/redirect', function(request, response){
    console.log(request.body)
    response.redirect('/success')
})
app.get('/success', function(request, response){
    response.send('success!!!')
})

app.get('/', function(request, response){
    console.log('body',request.body)  
    console.log('query', request.query)
    response.setHeader('Content-Type', 'text/html')
    response.send('<h1>It works!</h1>')
})

app.get('/jade', function(request, response){
    response.render('index.jade', {random : Math.random(), title : 'The Jadery'})    
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
