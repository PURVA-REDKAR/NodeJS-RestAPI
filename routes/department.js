/**
 * S File for Department 
 */
var Department = require("companydata").Department;
var datalayer = require("companydata");

	
exports.get = function(req, res){
	let company = req.query.company;
	let dept_id = req.query.dept_id;
	let data = datalayer.getDepartment(company,dept_id)
	if(data == null){
	//	let error = new Error('company'+company+' or depat '+dept_id+' does not exists');
		res.send(JSON.stringify("no department"));
	}
	res.send(data);
	
};


exports.getAll = function(req, res){
	let company = req.query.company;
	res.send(datalayer.getALLDepartment(company));
 
};

exports.post = function(req, res){
	
	  res.send("post");
};

exports.delAll = function(req, res){
	
	  res.send("delete");
};