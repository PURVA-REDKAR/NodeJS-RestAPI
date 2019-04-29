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
	res.send(datalayer.getAllDepartment(company));
 
};

exports.post = function(req, res){
			
	const Department = {
			 company   : req.body.company,
			 dept_name : req.body.dept_name,
			 location  : req.body.location,
			 dept_no   : req.body.dept_no,
		};
	
	let data = datalayer.insertDepartment(Department);
	if(data.dept_id < 0){
		res.send("could not insert");	
	}
	console.log(data.dept_id);
	res.send(data);

};


exports.put = function(req, res){
	
	let company = req.body.company;
	let dept_id = req.body.dept_id;
	
	
	console.log(company);
	console.log(dept_id);
	res.send("put");

};
exports.delAll = function(req, res){
	
	  res.send("delete");
};