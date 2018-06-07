(function(){
	'use strict';
	let simple=[1,2,3.5];
	let result=isNumeric(simple);
	if(!result){
		throw "isNumeric test failed";
	}
})();
(function(){
	'use strict';
	let simple=['1',2,3.5];
	let result=isNumeric(simple);
	if(result){
		throw "isNumeric test failed";
	}
})();
(function(){
	'use strict';
	let complex=[{x:1.0,y:2.3},{x:1.1,y:3.3},{x:1.2,y:4.3}];
	let result=isNumeric(complex,'x');
	if(!result){
		throw "isNumeric test failed";
	}
})();
(function(){
	'use strict';
	let complex=[{x:'1.0',y:2.3},{x:1.1,y:3.3},{x:1.2,y:4.3}];
	let result=isNumeric(complex,'x');
	if(result){
		throw "isNumeric test failed";
	}
})();