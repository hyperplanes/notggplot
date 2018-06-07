function getData(){
	let data=[];
	const categories=['Category A','Category B','Category C','Category D','Category E'];
	const groups=['Group A','Group B'];
	groups.forEach((group,g)=>{
		categories.forEach((category,c)=>{
			let count=Math.random()*25;
			data.push({count:count,category:category,group:group});
		});
	});
	return data;
}
function getData2(){
	let data=[
		{count:10,category:'Category A',group:'Group A'},
		{count:15,category:'Category A',group:'Group B'},
		{count:20,category:'Category B',group:'Group A'},
		{count:25,category:'Category B',group:'Group B'}
	];
	return data;
}
(function() {
	'use strict';

	//possible data types: categorical, numeric, date

	//test bar chart with categorical data

	let data=getData2();

	let plot=new notggplot({mapping:{x:'group',y:'count',fill:'category'},data:data})
		.geom_col();

	document.body.appendChild(plot.node());
})();
(function() {
	'use strict';

	//possible data types: categorical, numeric, date

	//test bar chart with categorical data

	let data=getData();

	let plot=new notggplot({mapping:{x:'group',y:'count',fill:'category'},data:data})
		.geom_col();

	document.body.appendChild(plot.node());
})();

(function() {
	'use strict';

	//possible data types: categorical, numeric, date

	//test bar chart with categorical data

	let data=getData();

	let plot=new notggplot({mapping:{x:'group',y:'count'},data:data})
		.geom_col();

	document.body.appendChild(plot.node());
})();