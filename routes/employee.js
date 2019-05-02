/**
 * http://usejsdoc.org/
 */
var Department = require("companydata").Employee;
var datalayer = require("companydata");

var response ={} ;

exports.get = function(req, res){
	
	let emp_id = req.query.emp_id;
	let data = datalayer.getEmployee(emp_id)
	if(data == null){
		response["error"] = "No Employee with emp_id :"+emp_id;
		res.type("json")
		   .send(JSON.stringify(response));
	}
	res.type("json")
	   .send(data);
	
};


exports.getAll = function(req, res){
	let company = req.query.company;
	let data = datalayer.getAllEmployee(company);
	if(data == null){
		response["error"] = "Please check company";
		 
		res.type("json")
		   .send(JSON.stringify(response));	
	}
	res.type("json")
	   .send(data);	
 
};

exports.post = function(req, res){
	let Employee = {
			emp_name   : req.body.emp_name,
			emp_no     : req.body.emp_no,
			hire_date  : req.body.hire_date,
			job        : req.body.job,
			salary     : req.body.salary,
			dept_id    : req.body.dept_id,
			mng_id     : req.body.mng_id,
		};

	
	let data = datalayer.insertEmployee(Employee);
	if(data.emp_id < 0){
		
		response["error"] = "could not insert Employee";
		 
		res.type("json")
		   .send(JSON.stringify(response));	
	}
	
	response["success"] =data
	    res.type("json")
	        .send(JSON.stringify(response));
};

exports.put = function(req, res){
	
	let emp_id = req.body.emp_id;
	let data = datalayer.getEmployee(emp_id);
	
	if(req.body.emp_name){
		data["emp_name"] = req.body.emp_name;
	}
	
	if(req.body.emp_no){
	
		data["emp_no"] = req.body.emp_no;
	}
	
	if(req.body.hire_date){
		
		data["hire_date"] = req.body.hire_date;
	}
    if(req.body.salary){
		
		data["salary"] = req.body.salary;
	}
    
    if(req.body.job){
		
		data["job"] = req.body.job;
	}
    if(req.body.dept_id){
		
		data["dept_id"] = req.body.dept_id;
	}
    if(req.body.mng_id){
		
		data["mng_id"] = req.body.mng_id;
	}
	
	 let update = datalayer.updateEmployee(data);
	
 	if(update){
		
 		response["success"] = update;
 		res.type("json")
		   .send(JSON.stringify(response));
 		return;
	}
	
	response["error"] = "could not Update Employee";
	 
	res.type("json")
	   .send(JSON.stringify(response));

};

exports.delAll = function(req, res){
	
	let emp_id = req.query.emp_id;
	
	let time = datalayer.getAllTimecard( emp_id );
	
	for (let i = 0; i < time.length; i++){
		  datalayer.deleteTimecard(time.timecard_id);  
		}
	
	
	let data = datalayer.deleteEmployee(emp_id);
	if(data <0){
		
		response["error"] = "could not Delete employee with emp_id"+emp_id;
		
		res.type("json")
		   .send(JSON.stringify(response));
		return;
		
	}
		
	
	
	response["Success"] = "Employee with emp_id : "+emp_id+"  deleted.";
	res.type("json")
	   .send(JSON.stringify(response));
};