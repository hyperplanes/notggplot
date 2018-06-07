function lightclone(argument) {
	"use strict";
	let T=typeof argument;
	if(T==='undefined' || argument===null){
		return argument;
	} else if(T==='string' || T==='boolean' || T==='number'){
		return argument;
	}else if(argument instanceof Date){
		return new Date(argument);
	}else if(argument instanceof Array){
		return argument.map(lightclone);
	}else if(T === 'object'){
		if('cloneNode' in argument && typeof argument.cloneNode ==='function'){
			return argument.cloneNode(true);
		}else{
			let output={};
			let keys=Object.keys(argument);
			keys.forEach(key=>{
				output[key]=lightclone(argument[key]);
				return output[key];
			});
			return output;
		}
	}else if(T==='function'){
		return argument;
	}
}