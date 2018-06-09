function getData(){
	let data=[];
	const categories=['Category A','Category B'];
	const groups=['Group A','Group B'];

	const length_out=100;

	for(let i=0;i<length_out;i++){
		let datum={
			count:Math.random()*25,
			category:categories[Math.floor(Math.random()*categories.length)],
			group:groups[Math.floor(Math.random()*groups.length)]
		};
		data.push(datum);
	}
	let dates=Rlang.seq({to:new Date(),length_out:data.length,by:'days'});
	data=data.map((d,i)=>{
		d.Date=dates[i];
		return d;
	});
	return data;
}

(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count',colour:'group',size:'category'},data:data})
		.geom_line();

	document.body.appendChild(plot.node());
})();
(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count',size:'category'},data:data})
		.geom_line();

	document.body.appendChild(plot.node());
})();
(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count'},data:data})
		.geom_line();

	document.body.appendChild(plot.node());
})();
(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count',size:'category',colour:'group'},data:data})
		.geom_line();

	document.body.appendChild(plot.node());
})();