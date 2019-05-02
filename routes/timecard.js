/**
 * http://usejsdoc.org/
 */
var Department = require("companydata").Timecard;
var datalayer = require("companydata");

var response ={} ;


exports.get = function(req, res){
	
	let timecard_id = req.query.timecard_id;
	let data = datalayer.getTimecard(timecard_id);
	if(data == null){
		response["error"] = "No timecard for timecard_id"+timecard_id;
		 
		res.type("json")
		   .send(JSON.stringify(response));	
	}
	res.send(data);
};

exports.getAll = function(req, res){
	let emp_id = req.query.emp_id;
	let data = datalayer.getAllTimecard(emp_id);
	if(data == null){
		response["error"] = "Please check Empid";
		 
		res.type("json")
		   .send(JSON.stringify(response));	
	}
	res.type("json")
	   .send(JSON.stringify(data));	
	
 
};

exports.post = function(req, res){
	
	let moment = require('moment');
	moment().format("yyyy-mm-dd hh:mm:ss");
	
	let Timecard = {
			emp_id         : req.body.emp_id,
			start_time     : req.body.start_time,
			end_time       : req.body.end_time
		};
	
	
	let data = datalayer.insertTimecard(Timecard);
	if(data.timecard_id < 0){
		
		response["error"] = "could not insert Employee";
		 
		res.type("json")
		   .send(JSON.stringify(response));	
	}
	
	    res.type("json")
	        .send(JSON.stringify(data));
};


exports.put = function(req, res){
	
	
	let emp_id = req.body.emp_id;
	let start_time = req.body.start_time;
	let end_time =  req.body.end_time;
	let timecard_id = req.body.timecard_id;
	let data = datalayer.getTimecard(timecard_id);
	
	if(req.body.start_time){
		data["start_time"] = start_time;
	}
	
	if(req.body.end_time){
		data["end_time"] = end_time;
	}
	
	let update = datalayer.updateTimecard(data);
	
	if(update){
		
		res.type("json")
		   .send(JSON.stringify(update));
	}
	
	response["error"] = "could not Update timecard";
	 
	res.type("json")
	   .send(JSON.stringify(update));

};


exports.delAll = function(req, res){
let timecard_id = req.query.timecard_id;
	
	
	let data = datalayer.deleteTimecard(timecard_id);
	if(data < 0){
		
		response["error"] = "could not Delete time card with timecard_id"+timecard_id;
		
		res.type("json")
		   .send(JSON.stringify(response));
		return;
		
	}
	
	response["Success"] = "Time card with timecard_id : "+timecard_id+"  deleted.";
	res.type("json")
	   .send(JSON.stringify(response));
};