function isDate(data,key){
	"use strict";
	let test=typeof key==='undefined'?d=>d instanceof Date:d=>d[key] instanceof Date;
	return data.every(test);
}