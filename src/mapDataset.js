function mapDataset(rawdataset,mapping) {
	'use strict';
	let mappingKeys=Object.keys(mapping);

	let mappingVariables=mappingKeys.map(key=>mapping[key]);

	//abstract dataset away from original names
	let dataset=rawdataset.map(d=>{
		let output={}
		mappingVariables.forEach((x,i)=>{
			output[mappingKeys[i]]=d[x];
		});
		return output;
	});
	return dataset;
}