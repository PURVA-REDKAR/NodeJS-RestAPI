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

var checkTimeExist = function(timecard_id){
	
	var Time = datalayer.getTimecard(timecard_id);
	if(Time == null){
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

exports.delTime = function (req, res, next){
	
	let timecard_id = req.query.timecard_id;
	
	if(checkTimeExist(timecard_id)){
		 next();
		 return;
	}
	
	response["error"] = "timecard_id "+timecard_id+" does not exists";
	next(
			res.type("json")
	           .send(JSON.stringify(response))
	     );
	return;
}

exports.delEmp = function (req, res, next){
	
	let emp_id = req.query.emp_id;
	
	if(checkEmpExists(emp_id)){
		 next();
		 return;
	}
	
	response["error"] = "emp_id "+emp_id+ " does not exists";
	next(
			res.type("json")
	           .send(JSON.stringify(response))
	     );
	return;
}

exports.insertEmp = function (req, res, next){
	

	
	let  error = valEmp(req);
	
	if(error){
	response["error"] =error
	next(
			res.type("json")
	           .send(JSON.stringify(response))
	     );
	
	return;
	}
	next();

	
}


exports.insertTime = function (req, res, next){
	
	let emp_id      = req.body.emp_id;
	let start_time  =  req.body.start_time;
	let end_time    = req.body.end_time;
	
	 if(checkNull( emp_id )){
		 
		 response["error"] ="Emp_id cannot be null ";
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
	 }
	 
	 if(!checkEmpExists(emp_id)){
		 
		 response["error"] ="Emp_id doesnt exist  ";
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
			return;
	 }
	 
	 if(checkNull( start_time )){
		 
		 response["error"] ="start_time doesnt exists";
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
			return;
	 }

	  if(checkNull( end_time )){
		 
		 response["error"] ="end_time doesnt exists";
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
			return;
	 }
	  let dateVal = checkDate(start_time,end_time);
	  if(dateVal){
		  response["error"] =dateVal;
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
			return;
	  }
	  
	  if(SameTime( emp_id ,start_time )){
		 
		  response["error"] ="start_time date already exists ";
			next(
					res.type("json")
			           .send(JSON.stringify(response))
			     );
			return;
		  
	  }
	  
	  
	next();
   
	
}


exports.updateTime = function (req, res, next){
	let moment = require('moment');
	 moment().format("yyyy-mm-dd hh:mm:ss");
	let emp_id      = req.body.emp_id;
	let start_time  = moment(req.body.start_time);
	let end_time    = moment(req.body.end_time);
	let timecard_id = req.body.timecard_id;
	

	  
	if(checkNull( timecard_id)){
		response["error"] ="Time card id cannot be null";
		next(
				res.type("json")
		           .send(JSON.stringify(response))
		     );
		return;	
	}
	
	if(checkNull( emp_id)){
		
		let data_e = datalayer.getTimecard(timecard_id);
		emp_id = data_e.emp_id;
	}

	
	if(! checkNull( start_time) && !checkNull( end_time)){
		   
		  let dateVal = checkDate(start_time,end_time);
		  if(dateVal){
			  response["error"] =dateVal;
				next(
						res.type("json")
				           .send(JSON.stringify(response))
				     );
				return;
		  }
	}
	
	next();
}

var SameTime = function(emp_id,start_time){
	let moment = require('moment');
	  moment().format("yyyy-mm-dd hh:mm:ss");
    let start_day = moment(start_time).date();
    let start_month = moment(start_time).month();
	let start_year = moment(start_time).year();
	
	var AllEmp = datalayer.getAllTimecard(emp_id);
	
	for (var i = 0; i < AllEmp.length; i++){
		
	    let start_day_t = moment(AllEmp[i].start_time).date();
	    let start_month_t = moment(AllEmp[i].start_time).month();
		let start_year_t = moment(AllEmp[i].start_time).year();
		
		 if( start_day_t == start_day && start_month == start_month_t && start_year == start_year_t){
		    	return true;
		  }
	}
	return false;
	
}

var checkTimeWeekend = function(start_time){
	let moment = require('moment');
	  moment().format("yyyy-mm-dd hh:mm:ss");
	
}
var checkDate = function(start_time,end_time){
	
	let moment = require('moment');
	  moment().format("yyyy-mm-dd hh:mm:ss");
	  let current = moment();
	  let TODAY = current.clone().startOf('day');
	  let A_WEEK_OLD = current.clone().subtract(7, 'days').startOf('day');

	  if(moment(start_time).isBefore(A_WEEK_OLD) && !moment(start_time).isSame(TODAY)){
		  
		  return "date cannot be older than a week";
	  }
	  
      let start_day = moment(start_time).date();
      let start_month = moment(start_time).month();
	  let start_year = moment(end_time).year();
	  
      let end_day = moment(start_time).date();
      let end_month = moment(start_time).month();
	  let end_year = moment(end_time).year();
	  if(! moment(start_day).isSame(start_day) || ! moment(start_month).isSame(end_month) || ! moment(end_year).isSame(start_year)){
		  return "start_time not equal to end_time "; 
	  }
	  let start_time_hour = moment(start_time).hour(); 
	  let end_time_hour   = moment(end_time).hour();

	  if(end_time_hour <  start_time_hour+1){
		  return "end_time should be at least 1 hour greater than the start_time ";  
	  }
	  if(end_time_hour < 8 || end_time_hour > 18 ){
		  return " end_time must be between the hours (in 24 hour format) of 06:00:00 and 18:00:00 "; 
	  }
	  
	  if(start_time_hour < 8 || start_time_hour > 18 ){
		  return " start_time_hour must be between the hours (in 24 hour format) of 06:00:00 and 18:00:00 "; 
	  }
	  
	  
	 
	  const weekday = moment(start_time).format('dddd'); // Monday ... Sunday
	  const isWeekend = weekday === 'Sunday' || weekday === 'Saturday';
	  console.log(isWeekend);
	  if(isWeekend){
		  return "cannot be weekend "; 
	  }
	  return false;
      
}

exports.valEmployeeUpdate = function (req, res, next){
		  
	 let emp_id ;
	 if(! checkNull( req.body.emp_id )){
		 
		 emp_id= req.body.emp_id; 
	 }
	 else{
		 
		 response["error"] ="emp_id cannot be null"
		 next(
					res.type("json")
			           .send(JSON.stringify(response))
			    );
			
		 return; 
			
	 }
	 
    if(req.body.dept_id ){
        if(! checkDeptExists("pr3044",req.body.dept_id) ){
   	          response["error"] ="dept_id  doesnt exit"
        	  next(
        			res.type("json")
        			   .send(JSON.stringify(response))
        	  );
		     return;
         }
      if(req.body.mng_id ){
            if((req.body.mng_id != 0 || req.body.mng_id != null )){
    	          
            	 if((!checkEmpExists(req.body.mng_id)) ){
    		
    	                response["error"] = "mng_id "+req.body.mng_id+ " does not exists";
    		            next(
           		    	      res.type("json")
           			             .send(JSON.stringify(response))
           	                );
   		           return;
    		
    	         }
            }
      }
           
   }
   if(req.body.hire_date ){
        
	     if(CheckDateFuture(req.body.hire_date)){
		   
		      response["error"] = "hire_date "+hire_date+ " is in future";
              next(
		    	         res.type("json")
			                .send(JSON.stringify(response))
	                );
               return;
		
	       }
          if(checkWeekend(req.body.hire_date)){
		
		        response["error"] = "hire_date is weekend";
                 next(
		    	         res.type("json")
			                .send(JSON.stringify(response))
	                );
               return;
		
	       }
    }
   
   if(req.body.emp_no){
   
         if(checkEmpNo(req.body.emp_no)){	
        	 
        	 response["error"] = "emp_no "+emp_no+" already exists";
             next(
	    	         res.type("json")
		                .send(JSON.stringify(response))
                );
           return;
		  
		 }
   }
   
   next();

}

var valEmp = function (req){
	
	let company = "pr3044";
	let dept_id = req.body.dept_id;
	
   if(! checkDeptExists(company,dept_id)){
		
		return " dept_id "+dept_id+ "company"+ company +" does not exists";
	}
	let mng_id = req.body.mng_id;
	
	if((!checkEmpExists(mng_id)) && (mng_id != 0)){
		
		return "mng_id "+mng_id+ " does not exists";
		
	}
	
	let hire_date = req.body.hire_date;
    
	if(CheckDateFuture(hire_date)){
		
		return "hire_date "+hire_date+ " is in future";
		
	}
	if(checkWeekend(hire_date)){
		
		return  "hire_date is weekend";
		
	}
	
	let emp_no = req.body.emp_no;
	if(checkEmpNo(emp_no)){
		
		return "emp_no "+emp_no+" already exists";
		
	}
	
	return false;
}
var checkEmpNo = function(emp_no){

	var AllEmp = datalayer.getAllEmployee("pr3044");
	
	for (var i = 0; i < AllEmp.length; i++){
	
		 if(AllEmp[i].emp_no == emp_no ){
		    	return true;
		  }
	}
	return false;		
}

var checkEmpExists = function(emp_id){

	var Emp = datalayer.getEmployee(emp_id);
	
	if(Emp == null){
		return false;	
	}
	
	return true;		
}

var CheckDateFuture= function(date){
	
	var CurrentDate = new Date();
	GivenDate = new Date(date);
	if(GivenDate > CurrentDate){
	    return true;
	}
	return false;
}

var checkWeekend =function(date){
	
	 let d = new Date(date);
	 let n = d.getDay();
	 
	 if(n == 5 || n == 6){
		 
	   return true;
	 }
	return false;
}
