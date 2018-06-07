function isNumeric(data,key){
	"use strict";
	let test=typeof key==='undefined'?d=>typeof d==='number':d=>typeof d[key]==='number';
	return data.every(test);
}