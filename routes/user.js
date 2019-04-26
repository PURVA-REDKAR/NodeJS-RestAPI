
/*
 * GET users listing.
 */


var Department = require("companydata").Department;
var datalayer = require("companydata");
exports.list = function(req, res){
	console.log(datalayer.getAllDepartment("pr3044"));
  res.send("user");
};