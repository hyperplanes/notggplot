var Rlang;
(function (Rlang) {
	"use strict";
	function cumsum(x){
		var result = x.reduce(function(r, a) {
			if (r.length > 0){
				a += r[r.length - 1];
			}
			r.push(a);
			return r;
		}, []);
		return result;
	}
    Rlang.cumsum = cumsum;
})(Rlang || (Rlang = {}));