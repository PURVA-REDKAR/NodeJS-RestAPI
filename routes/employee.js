/**
 * http://usejsdoc.org/
 */
var Department = require("companydata").Employee;
var datalayer = require("companydata");

exports.get = function(req, res){
	
	let emp_id = req.query.emp_id;
	let data = datalayer.getEmployee(emp_id)
	if(data == null){
	//	let error = new Error('company'+company+' or depat '+dept_id+' does not exists');
		res.send(JSON.stringify("no employee"));
	}
	res.send(data);
	
};


exports.getAll = function(req, res){
	let company = req.query.company;
	res.send(datalayer.getAllEmployee(company));
 
};

exports.post = function(req, res){
		
	res.send("post");
};

exports.delAll = function(req, res){
	 res.send("delete");
};