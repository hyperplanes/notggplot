function mappingResolver(globalarg,localarg){
	'use strict';
	if(typeof localarg==='undefined'){
		return lightclone(globalarg);
	}else if(typeof globalarg==='undefined'){
		return lightclone(localarg);
	}
	globalarg=lightclone(globalarg);
	localarg=lightclone(localarg);
	let output={...globalarg,...localarg};
	if('mapping' in localarg && 'mapping' in globalarg){
		output.mapping={...globalarg.mapping,...localarg.mapping};
	}
	return output;
}