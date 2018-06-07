(function(){
	'use strict';
	let simple=[1,2,3.5];
	let result=isDate(simple);
	if(result){
		throw "isDate test failed";
	}
})();
(function(){
	'use strict';
	let simple=[new Date(2015,2,6),new Date(2016,2,6),new Date(2017,2,6)];
	let result=isDate(simple);
	if(!result){
		throw "isDate test failed";
	}
})();
(function(){
	'use strict';
	let complex=[{x:1.0,y:2.3},{x:1.1,y:3.3},{x:1.2,y:4.3}];
	let result=isDate(complex,'x');
	if(result){
		throw "isDate test failed";
	}
})();
(function(){
	'use strict';
	let complex=[{x:new Date(2015,2,6),y:2.3},{x:new Date(2016,2,6),y:3.3},{x:new Date(2017,2,6),y:4.3}];
	let result=isDate(complex,'x');
	if(!result){
		throw "isDate test failed";
	}
})();