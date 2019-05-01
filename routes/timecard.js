/**
 * http://usejsdoc.org/
 */
var Department = require("companydata").Timecard;
var datalayer = require("companydata");

exports.get = function(req, res){
	
	let timecard_id = req.query.timecard_id;
	let data = datalayer.getTimecard(timecard_id);
	if(data == null){
		res.send(JSON.stringify("no department"));
	}
	res.send(data);
};

exports.getAll = function(req, res){
	let emp_id = req.query.emp_id;
	res.send(datalayer.getAllTimecard(emp_id));
 
};

exports.post = function(req, res){
	let Timecard = {
			emp_id         : req.body.emp_id,
			start_time     : req.body.start_time,
			end_time       : req.body.end_time
		};
	

	let data = datalayer.insertTimecard(Employee);
	if(data.emp_id < 0){
		
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
	let end_time = req.body.end_time;
	let data = datalayer.getTimecard(timecard_id);
	
	if(req.body.start_time){
		data["start_time"] = req.body.start_time;
	}
	
	if(req.body.end_time){
		data["end_time"] = req.body.end_time;
	}
	
	let update = datalayer.updateTimecard(data);
	
	if(update){
		
		res.type("json")
		   .send(JSON.stringify(update));
	}
	
	response["error"] = "could not Update Department";
	 
	res.type("json")
	   .send(JSON.stringify(response));

};


exports.delAll = function(req, res){
	res.send("delete");
};