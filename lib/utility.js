/**
 * http://usejsdoc.org/
 */

var datalayer = require("companydata");

exports.valdepartment = function (req, res, next) {
//	{ 
//		   "company":"rituserid", 
//		   "dept_name":"IT", 
//		   "dept_no":"d11", 
//		   "location":"rochester" 
//		}
	
	let company = req.body.company;
	let dept_name = req.body.dept_name;
	let dept_no = req.body.dept_no;
	let location = req.body.location;
	if( req.query.dept_id == 0){
		 next(res.send("Permission denied."));
		    return;
	}
  console.log('LOGGED');
  next();
}