function consolidateMapping(dataset){
	'use strict';
	return dataset.reduce(function(total, currentValue, currentIndex, arr){
			let keys=Object.keys(currentValue);
			keys.splice(keys.indexOf('y'),1);
			let existing=total.filter(x=>keys.reduce((total,key)=>total && x[key]===currentValue[key],true));
			if(existing.length===0){
				total.push(lightclone(currentValue));
			}else{
				existing.y+=currentValue.y;
			}
			return total;
		},[]);
}