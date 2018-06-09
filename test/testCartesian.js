const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

(function(){
	const categories=['Category A','Category B'];
	const groups=['Group A','Group B'];

	let example=[categories,groups];
	let cartesianProduct=cartesian(...example);

	const expected=[
		["Category A", "Group A"],
		["Category A", "Group B"],
		["Category B", "Group A"],
		["Category B", "Group B"]
	]
	expected.forEach((x,rowIndex)=>{
		x.forEach((xi,colIndex)=>{
			if(cartesianProduct[rowIndex][colIndex]!==expected[rowIndex][colIndex]){
				throw "Test failed";
			}
		})
	});
})();

(function(){
	const categories=['Category A','Category B'];
	const groups=['Group A','Group B'];

	let example=[categories];
	let cartesianProduct=cartesian(...example);

	const expected=[
		"Category A",
		"Category B"
	]
	expected.forEach((x,rowIndex)=>{
		if(cartesianProduct[rowIndex]!==expected[rowIndex]){
			throw "Test failed";
		}
	});
})();