var Rlang;
(function (Rlang) {
    "use strict";

    function setdiff(A, B) {
        return A.filter(function (x) { return B.indexOf(x) < 0 });
    }
    function intersect(A, B) {
        return A.filter(function (x) { return B.indexOf(x) >= 0 });
    }
    function unique(A){
    	return A.filter(function(x,i,arr){
    		if(typeof x==='object' && !(x instanceof Date)){
    			throw "unique doesn't work with reference types";
    		}
    		return arr.indexOf(x)===i;
    	});
    }

	const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
	const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

	Rlang.cartesian=cartesian;
    Rlang.unique=unique
    Rlang.intersect = intersect;
    Rlang.setdiff = setdiff;
})(Rlang || (Rlang = {}));