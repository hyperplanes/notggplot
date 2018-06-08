function notggplot(globalargument) {
	"use strict";
	if(typeof globalargument==='undefined'){
		globalargument={};
	}
	if(!('layers' in globalargument)){
		globalargument.layers=[];
	}
	if(!('datasets' in globalargument)){
		globalargument.datasets=[];
	}
	if(!('padding' in globalargument)){

		globalargument.padding={
			top:60,
			bottom:60,
			left:70,
			right:60
		};

	}
	this.geom_col=function(argument){
		let internal=lightclone(globalargument);
		let args=mappingResolver(argument,globalargument);
		let mapping=args.mapping;
		let dataset=consolidateMapping(mapDataset(args.data,mapping));
		let levels=getLevelsOfMappingVariables(dataset,mapping);

		levels.x.forEach((x,i)=>{
			let bar=dataset.filter(d=>d.x===x);
			let cumY=Rlang.cumsum(bar.map(b=>b.y));
			bar.forEach((b,j)=>b.cumY=cumY[j]);
		});

		let maxY=1.1*d3.max(dataset,d=>d.cumY);

		internal.domain={x:levels.x,y:[0,maxY]};	

		if(!('ylab' in internal)){
			internal.ylab=mapping.y;
		}
		if(!('xlab' in internal)){
			internal.xlab=mapping.x;
		}
		if('fill' in levels){
			internal.padding.right=d3.max(levels['fill'],d=>d.length)*10+30;
		}
		internal.layers.push({
			zindex:0,
			fn:function(svg,internal){


				let circles=svg.selectAll(".geom_col")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("x", (d,i)=> internal.xScale(d.x))
				.attr("y", d=> internal.yScale(d.cumY))
				.attr("width", internal.xScale.bandwidth())
				.attr("height", d=>internal.yScale(0)-internal.yScale(d.y))
				.classed('geom_col',true);
				
				fillAesthetic(svg,internal,levels,circles,args,"rect");
			}
		});		

		return new notggplot(internal);
	}
	this.geom_point=function(argument){
		let internal=lightclone(globalargument);
		let args=mappingResolver(argument,globalargument);
		let mapping=args.mapping;
		let dataset=mapDataset(args.data,mapping);
		let levels=getLevelsOfMappingVariables(dataset,mapping);

		let minX=d3.min(dataset,d=>d.x);
		let maxX=d3.max(dataset,d=>d.x);
		const xPadding=0.1*(maxX-minX);
		minX=minX-xPadding;
		maxX=maxX+xPadding;
		if(isDate(dataset,'x')){
			minX=new Date(minX);
			maxX=new Date(maxX);
		}
		let maxY=1.1*d3.max(dataset,d=>d.y);

		internal.domain={x:[minX,maxX],y:[0,maxY]};	


		if(!('ylab' in internal)){
			internal.ylab=mapping.y;
		}
		if(!('xlab' in internal)){
			internal.xlab=mapping.x;
		}
		if('fill' in levels){
			internal.padding.right=d3.max(levels['fill'],d=>d.length)*10+30;
		}
		if(!('size' in args)){
			args.size=1;
		}
		internal.layers.push({
			zindex:0,
			fn:function(svg,internal){


				let circles=svg.selectAll(".geom_point")
				.data(dataset)
				.enter()
				.append("circle")
				.attr("cx", (d,i)=>internal.xScale(d.x))
				.attr("cy", d=> internal.yScale(d.y))
				.attr("r", 2*args.size)
				.classed('geom_point',true);

				fillAesthetic(svg,internal,levels,circles,args,"circle");
			}
		});
		return new notggplot(internal);
	}
	this.gg=function(){
		return makePlot(globalargument);
	}
	this.node=function(){
		return this.gg().node();
	}
}