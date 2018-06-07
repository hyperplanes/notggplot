function mergeMapping(local,globals){
	"use strict"
	let output=globals;
	let keys=Object.keys(local);
	let mapIndex=keys.indexOf('mapping');
	if(mapIndex>=0){
		keys.splice(mapIndex,1);
	}
	keys.forEach(key=>{
		output[key]=lightclone(local[key]);
		return output[key];
	});
	return output;
}