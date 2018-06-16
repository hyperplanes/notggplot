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

	let plot=new notggplot({mapping:{x:'Date',y:'count',fill:'group'},data:data})
		.geom_point({size:2});

	document.body.appendChild(plot.node());
})();
(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count',fill:'category'},data:data})
		.geom_point({size:6});

	document.body.appendChild(plot.node());
})();

(function() {
	'use strict';

	let data=getData();

	let plot=new notggplot({mapping:{x:'Date',y:'count'},data:data})
		.geom_point({size:1});

	document.body.appendChild(plot.node());
})();

(function() {
	'use strict';

	let data=getData();
	data.forEach(d=>d.z=Math.random()*20);
	let plot=new notggplot({mapping:{x:'z',y:'count'},data:data})
		.geom_point({size:1});

	document.body.appendChild(plot.node());
})();

(function() {
	'use strict';

	let data=getData();
	data.forEach(d=>d.z=Math.random()*20);
	let plot=new notggplot({mapping:{x:'z',y:'count',colour:'group'},data:data})
		.geom_point({size:3});

	document.body.appendChild(plot.node());
})();