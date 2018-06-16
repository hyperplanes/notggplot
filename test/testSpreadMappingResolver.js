(function(){
	'use strict';
function getData(){
	let data=[
		{count:1,group:'Group A',category:'Category A',Date:new Date(2018,1,1)},
		{count:2,group:'Group A',category:'Category B',Date:new Date(2018,2,1)},
		{count:3,group:'Group B',category:'Category A',Date:new Date(2018,3,1)},
		{count:4,group:'Group B',category:'Category B',Date:new Date(2018,4,1)},
	];
	return data;
}


(function() {
	'use strict';

	let data=getData();
	let globalarg={mapping:{x:'Date',y:'count',colour:'group'},data:data};
	let localarg={mapping:{size:'category'},zindex:1};

	let combo=mappingResolver(globalarg,localarg);

	let expected={mapping: {x: "Date", y: "count", colour: "group", size: "category"}, data: getData(), zindex: 1};
	let areequal=true;
	
	let outputKeys=Object.keys(combo);
	if(outputKeys.length!==3){
		areequal=false;
	}
	if(outputKeys.indexOf('mapping')<0 || outputKeys.indexOf('data')<0 || outputKeys.indexOf('zindex')<0 || combo.zindex!==1){
		areequal=false;
	}
	//check mapping
	let outputMapKeys=Object.keys(combo.mapping);
	if(outputMapKeys.length!==4){
		areequal=false;
			throw "mapping is not the same";
	}
	for(let i=0;i<outputMapKeys.length;i++){
		if(combo.mapping[outputMapKeys[i]]!==expected.mapping[outputMapKeys[i]]){
			areequal=false;
			throw "mapping is not the same";
		}
	}

	//check data
	let outputData=combo.data;
	let expectedData=expected.data;
	if(outputData.length!==expectedData.length){
		areequal=false;
		throw "datasets are different lengths";
	}
	for(let i=0;i<expectedData.length;i++){
		let outputDatum=expectedData[i];
		let expectedDatum=expectedData[i];
		let outputDatumKeys=Object.keys(outputDatum);
		let expectedDatumKeys=Object.keys(expectedDatum);
		if(outputDatumKeys.length !== expectedDatumKeys.length){
			areequal=false;
			throw "datasets are different";
		}
		for(let key in expectedDatum){
			if(expectedDatum[key]!==outputDatum[key]){
				areequal=false;
				throw "datasets are not the same";
			}
		}
	}
	if(!areequal){
		throw "mappingResolver failed";
	}
})();

})();
