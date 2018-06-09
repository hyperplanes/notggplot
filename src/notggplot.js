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
	this.geom_line=function(argument){
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
		let mappingKeys=Object.keys(levels);
		let mapplingLevels=mappingKeys.map(k=>levels[k]);
		let possibleMapCombos=Rlang.cartesian(...mapplingLevels);
		if(typeof possibleMapCombos=='undefined'){
			possibleMapCombos=[];
		}
		let distinctLevels=possibleMapCombos.map(x=>{
				let output={};
				if(mappingKeys.length>1){
					mappingKeys.forEach((k,i)=>output[k]=x[i]);
				}else{
					output[mappingKeys[0]]=x;
				}
				return output; //returns object describing a distinct level of data
			});
		let datasets=distinctLevels.length===0?[dataset]:distinctLevels.map(distinctLevel=>dataset.filter(datum=>{//for each distinct level, return the subset of dataset that matches
				return mappingKeys.reduce(function(isMatch, key){//reduce columns of this datarow to boolean match or no match
					return isMatch && datum[key]===distinctLevel[key];
				},true)
			}));
	let maxLabelLength=Object.keys(levels).reduce((total,current)=>{
		let rowMax=levels[current].reduce((total2,word)=>{
			let n=word.length;
			if(n>total2){
				total2=n;
			}
			return total2;
		},0);
		if(rowMax>total){
			total=rowMax;
		}
		return total;
	},0);
	if(maxLabelLength>0){
		internal.padding.right=maxLabelLength*10+30;
	}
		internal.layers.push({
			zindex:0,
			fn:function(svg,internal){
				var valueline = d3.line()
				    .x(d => internal.xScale(d.x))
				    .y(d => internal.yScale(d.y));

				let paths=datasets.map(dataset=>{
					let path=svg.append("path")
						.data([dataset])
						.attr("class", "notgg-geom_line")
						.style('stroke-width',2)
						.attr("d", valueline);		

					return path;		
				});

				if(mappingKeys.length>0){
					let scales={};
					if('colour' in levels){
						scales.colour=d3.scaleSequential(d3.interpolateRainbow).domain([0,levels.colour.length]);
						paths=paths.map(path=>path.style("stroke",d=>scales.colour(levels.colour.indexOf(d[0].colour))));
					}
					if('size' in levels){
						let sizes=Rlang.seq({from:1,to:10,length_out:levels["size"].length});
						let sizeKeys=levels["size"];
						scales.size=key=>sizes[sizeKeys.indexOf(key)];
						paths=paths.map((path,i)=>path.style("stroke-width",()=>scales.size(datasets[i][0].size)));
					}
					geomLineLegend(svg,internal, levels,distinctLevels,args,scales)
					
				}//legend
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