function makePlot(internal){
	'use strict';
	internal=lightclone(internal);


	let w=internal.width=500;
	let h=internal.height=500;

	let svg=d3.create("svg")
		.attr('viewBox',"0 0 "+w+" "+h)
		.attr('class','notgg')
		.attr("preserveAspectRatio","xMidYMid slice");

	internal.range={
		x:[internal.padding.left,internal.width-internal.padding.right],
		y:[internal.height-internal.padding.bottom,internal.padding.top]
	};

	internal.tickEvery=100;

	internal.xScale = getScale(internal.domain.x,internal.range.x);
	internal.yScale = getScale(internal.domain.y,internal.range.y);

	if(internal.panel_background!=='element_blank'){
		svg.append('rect')
			.attr('x', internal.range.x[0])
			.attr('y', internal.range.y[1])
			.attr('height',internal.range.y[0]-internal.range.y[1])
			.attr('width',internal.range.x[1]-internal.range.x[0])
			.classed('notgg-plotarea-background',true);
	}
	if(internal.panel_grid_major!=='element_blank'){
		make_majorGrid(svg,internal);
	}

	internal.todo.sort((x,y)=>x.zindex-y.zindex);
	internal.todo.forEach(x=>x.fn(svg,internal));

	makeAxis(svg,internal);
	makeLegend(svg,internal);
    //add axis labels
	if(internal.ylab!==null){
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", internal.padding.top/4)
			.attr("x", 0 - (internal.height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(internal.ylab)
			.attr('class', 'notgg-axisLab');
	}
	if(internal.xlab!==null){
		svg.append("text")
			.attr("x", (internal.width-internal.padding.left-internal.padding.right) / 2 +internal.padding.left)
			.attr("y", internal.height-internal.padding.bottom/4)
			.attr("text-anchor", "middle")
			.attr('class', 'notgg-axisLab')
			.text(internal.xlab);
	}
	return svg;
}