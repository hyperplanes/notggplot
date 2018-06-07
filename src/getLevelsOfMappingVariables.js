function getLevelsOfMappingVariables(dataset,mapping) {
	'use strict';
	let categoricalMappingVariables=Object.keys(mapping).filter(key=>isCategorical(dataset,key));
	let levelsOfMappingVariables=categoricalMappingVariables.map(key=>Rlang.unique(dataset.map(d=>d[key])));
	let levels={};
	categoricalMappingVariables.forEach((key,i)=>{
		levels[key]=levelsOfMappingVariables[i];
	});
	return levels;
}