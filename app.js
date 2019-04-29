
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , department = require('./routes/department')
  , employee = require('./routes/employee')
  , timecard = require('./routes/timecard')
  , http = require('http')
  , path = require('path')
  , util = require('./lib/utility');


var app = express();


 
bodyParser = require("body-parser"),
urlEncodedParser = bodyParser.urlencoded({extended: false}),
jsonParser = bodyParser.json();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/CompanyServices', routes.index);

app.get('/CompanyServices/department', department.get);
app.get('/CompanyServices/departments', department.getAll);
app.get('/CompanyServices/employee', employee.get);
app.get('/CompanyServices/employees', employee.getAll);
app.get('/CompanyServices/timecard', timecard.get);
app.get('/CompanyServices/timecards', timecard.getAll);



app.post('/CompanyServices/department', util.valdepartment,department.post);
app.put('/CompanyServices/department', department.put);
//app.delete('/CompanyServices/department', department.delAll);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
