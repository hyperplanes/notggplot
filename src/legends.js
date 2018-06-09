function geomLineLegend(svg,internal, levels,distinctLevels,args,scales){
	'use strict'
	let mapping=args.mapping;
	let legendVariables=Object.keys(levels);
	

	let paddingTop=internal.padding.top;
	let paddingBottom=internal.padding.bottom;
	let height=internal.height;

	let NumberOfRowsInLegends=legendVariables.map(legend=>levels[legend].length);
	let heightsOfLegends=NumberOfRowsInLegends.map(nrows=>28*(1+nrows));
	let combinedLegendHeight=heightsOfLegends.reduce((total,x)=>total+x+14,0);
	let midPointOfGraph=paddingTop+0.5*(height-paddingBottom-paddingTop);
	let topOfAllLegends=midPointOfGraph-combinedLegendHeight/2;
	let topsOfEachLegend=[];
	heightsOfLegends.reduce((total,current,i)=>{
		if(i>0){
			total+=14+current;
		}
		topsOfEachLegend.push(total);
		return total;
	},topOfAllLegends);
	

	topsOfEachLegend.forEach((legendTop,i)=>{
		let legend=legendVariables[i];
		let title=mapping[legendVariables[i]];
		svg.append("text")
			.attr("x", internal.width-internal.padding.right/2)
			.attr("y", legendTop+14)
			.attr("text-anchor", "middle")
			.attr('class', 'notgg-axisLab')
			.text(title);

		svg.selectAll()
			.data(levels[legend])
			.enter()
			.append('text')
			.attr('x',d=>internal.width-internal.padding.right+30)
			.attr('y',(d,k)=>legendTop+28*(k+1)+.65*28)
			.text(d=>d)
			.classed('notgg-legend-key',true);

		levels[legend].forEach((level,j)=>{
			let legendXScale=d3.scaleLinear()
				.domain([0,1])
				.range([internal.width-internal.padding.right+2,internal.width-internal.padding.right+26]);
			let legendBottom=legendTop+heightsOfLegends[i];
			let legendSeq=Rlang.seq({from:0,length_out:levels[legend].length});

			let legendLine = d3.line()
				.x(d => legendXScale(d.x))
				.y(d => legendTop+28*(d.y+1)+.65*28-7);
			let legendLineData=[{x:0,y:j},{x:1,y:j}];
			let shape=svg.append('path')
				.data([legendLineData])
				.attr("class", "notgg-geom_line")
				.style('stroke-width',2)
				.attr("d", legendLine);

			if(legend==='colour'){
				shape=shape.style("stroke",d=>scales.colour(levels[legend].indexOf(level)));
			}
			if(legend==='size'){
				shape=shape.style("stroke-width",d=>scales.size(level));
			}
		});
	})



	//begin old code
	/*
	let legendHeight=(distinctLevels.length+1)*28;
	let legendTopOfGraph=0.5*((internal.height-internal.padding.bottom-internal.padding.top)-legendHeight);
	let legendTop=internal.padding.top+legendTopOfGraph;
	let legendBottom=legendTop+legendHeight;

	svg.append("text")
	.attr("x", internal.width-internal.padding.right/2)
	.attr("y", legendTop+14)
	.attr("text-anchor", "middle")
	.attr('class', 'notgg-axisLab')
	.text(mapping['colour']);

	let legendXScale=d3.scaleLinear()
	.domain([0,1])
	.range([internal.width-internal.padding.right+2,internal.width-internal.padding.right+26]);

	let legendSeq=Rlang.seq({from:0,length_out:distinctLevels.length});
	let legendYScale=d3.scaleBand()
	.domain(legendSeq)
	.range([legendBottom-14,legendTop+28+14]);
	var legendLine = d3.line()
	.x(d => legendXScale(d.x))
	.y(d => legendYScale(d.y));

	distinctLevels.forEach((level,i)=>{
		let legendLineData=[{x:0,y:i},{x:1,y:i}];

		let shape=svg.append('path')
		.data([legendLineData])
		.attr("class", "notgg-geom_line")
		.attr("d", legendLine);

		if('colour' in level){
			shape=shape.style("stroke",d=>scales.colour(levels.colour.indexOf(level.colour)));
		}
		if('size' in level){
			shape=shape.style("stroke-width",d=>scales.size(level.size));
		}
	});
	*/
}