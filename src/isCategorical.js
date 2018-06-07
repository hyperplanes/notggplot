function isCategorical(data,key){
	"use strict";
	let test=typeof key==='undefined'?d=>typeof d==='string':d=>typeof d[key]==='string';
	return data.every(test);
}