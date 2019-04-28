/**
 * http://usejsdoc.org/
 */
var Department = require("companydata").Timecard;
var datalayer = require("companydata");

exports.get = function(req, res){
	
	let timecard_id = req.query.timecard_id;
	let data = datalayer.getTimecard(timecard_id)
	if(data == null){
	//	let error = new Error('company'+company+' or depat '+dept_id+' does not exists');
		res.send(JSON.stringify("no department"));
	}
	res.send(data);
};

exports.getAll = function(req, res){
	let emp_id = req.query.emp_id;
	res.send(datalayer.getAllTimecard(emp_id));
 
};
exports.post = function(req, res){
	res.send("post");
};

exports.delAll = function(req, res){
	res.send("delete");
};