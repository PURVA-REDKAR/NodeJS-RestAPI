/**
 * Service Layer File for Department 
 */
var Department = require("companydata").Department;
var datalayer = require("companydata");
var response ={} ;

exports.get = function(req, res){
	let company = req.query.company;
	let dept_id = req.query.dept_id;
	let data = datalayer.getDepartment(company,dept_id);
	if(data == null){
		response["error"] = "no department";
		res.type("json")
		   .send(JSON.stringify(response));
	}
	res.type("json")
	   .send(JSON.stringify(data));

	
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
			 dept_no   : req.body.dept_no
		};
	
	let data = datalayer.insertDepartment(Department);
	if(data.dept_id < 0){
		
		const error ={
			error : "Could not insert"	
		}
		 
		res.type("json")
		   .send(JSON.stringify(error));	
	}
	
	
	response["success"] = data;
	res.type("json")
	   .send(JSON.stringify(response));

};


exports.put = function(req, res){
	
	let company = req.body.company;
	let dept_id = req.body.dept_id;
	let data = datalayer.getDepartment(company,dept_id);
	
	if(req.body.dept_name){
		data["dept_name"] = req.body.dept_name;
	}
	
	if(req.body.dept_no){
		data["dept_no"] = req.body.dept_no;
	}
	
	if(req.body.location){
	
		data["location"] = req.body.location;
	}
	
	let update = datalayer.updateDepartment(data);
	
	if(update){
		response["success"] = update;
		res.type("json")
		   .send(JSON.stringify(response));
	}
	
	response["error"] = "could not Update Department";
	 
	res.type("json")
	   .send(JSON.stringify(response));

};


exports.delAll = function(req, res){
	let response ={};
	let company = req.query.company;
	let dept_id = req.query.dept_id;
	
	let data = datalayer.deleteDepartment(company,dept_id);
	if(data <0){
		
		response["error"] = "could not Delete";
		
		res.type("json")
		   .send(JSON.stringify(response));
		return;
		
	}
	
	response["Success"] = "Department "+dept_id+" from "+company+" deleted.";
	res.type("json")
	   .send(JSON.stringify(response));
	
};


exports.delCompany = function(req, res){
	let response ={};
	let company = req.query.company;
	emp = datalayer.getAllEmployee( company );
   
	
	for (let i = 0; i < emp.length; i++){
	  
		let time = datalayer.getAllTimecard( emp.emp_id );
	    
		for (let i = 0; i < time.length; i++){
		  datalayer.deleteTimecard(time.timecard_id);  
		}		
		datalayer.deleteEmployee( emp.emp_id );		
	}
	
	let data = datalayer.deleteCompany(company);
	if(data <0){
		
		response["error"] = "could not Delete";		
		res.type("json")
		   .send(JSON.stringify(response));		
	}			
	response["Success"] = company+" deleted.";
	res.type("json")
	   .send(JSON.stringify(response));
	
};