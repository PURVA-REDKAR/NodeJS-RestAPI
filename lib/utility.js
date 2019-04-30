/**
 * http://usejsdoc.org/
 */

var datalayer = require("companydata");
var response ={};
exports.valDepartment = function (req, res, next) {
	
	
	let company = req.body.company;
	if(checkNull(company)){
		response["error"] = "Company cannot be null";
		next(
				res.type("json")
		           .send(JSON.stringify(response))
		   );
		return;
	}
	let dept_name = req.body.dept_name;
    if(checkNull(dept_name)){
		
		next(res.send("dept_name cannot be null"));
		    return;
	}
	let dept_no = req.body.dept_no;
    if(checkNull(dept_no)){
		
		next(res.send("dept_no cannot be null"));
		    return;
	}
	let location = req.body.location;
    if(checkNull(location)){
		
		next(res.send("location cannot be null"));
		    return;
	}
    if(checkDeptnoExists(company,dept_no)){
    	
    	next(res.send("Dept_no already exists"));
	    return;
    }
  next();
}

var checkNull = function(value) {
	
	if(value== null || value == 0 || value == "")
	{
	   return true;	
	}
    
	return false;
};

var checkDeptnoExists = function(company,dept_no){
	var allDept = datalayer.getAllDepartment(company);
	
	for (var i = 0; i < allDept.length; i++){
	
		 if(allDept[i].dept_no == dept_no ){
		    	return true;
		  }
	}
	return false;
}


var checkDeptExists = function(company,dept_id){
	var Dept = datalayer.getDepartment(company,dept_id);
	
	if(Dept == null){
		return false;	
	}
	
	return true;
	
}

exports.valDepartmentUpdate = function (req, res, next){
	
	  
	 let company,dept_id ;
	 if(! checkNull( req.body.company )){
		 
		 company= req.body.company; 
	 }
	 else{
		 next(res.send("Company cannot be null"));
		    return;
	 }
	 
     if(! checkNull( req.body.dept_id )){
		 
		  dept_id = req.body.dept_id; 
	 }
     else{
		 next(res.send("dept_id cannot be null"));
		    return;
	 }
     
     if(! checkDeptExists(company,dept_id) ){
    	 
    	    next(res.send("dept_id +  company should eists"));
		    return;
     }
     next();

}

exports.delDepart = function (req, res, next){
	
	let company = req.query.company;
	let dept_id = req.query.dept_id;
	if(checkDeptExists(company,dept_id)){
		 next();
		 return;
	}
	
	response["error"] = "dept_id "+dept_id+ "company"+ company +" does not exists";
	next(
			res.type("json")
	           .send(JSON.stringify(response))
	     );
	return;
}
