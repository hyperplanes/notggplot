function fillAesthetic(svg,internal,levels,circles,mapping){
	if('fill' in levels){
		let fillScale=d3.scaleSequential(d3.interpolateRainbow)
		.domain([0,levels.fill.length]);
		circles.attr("fill",d=>fillScale(levels.fill.indexOf(d.fill)));
		let legendHeight=(levels.fill.length+1)*28;
		let legendTopOfGraph=0.5*((internal.height-internal.padding.bottom-internal.padding.top)-legendHeight);
		let legendTop=internal.padding.top+legendTopOfGraph;
		svg.append("text")
		.attr("x", internal.width-internal.padding.right/2)
		.attr("y", legendTop+14)
		.attr("text-anchor", "middle")
		.attr('class', 'notgg-axisLab')
		.text(mapping['fill']);
		svg.selectAll('.notgg-legend-fill')
		.data(levels.fill)
		.enter()
		.append('rect')
		.attr('x',d=>internal.width-internal.padding.right+2)
		.attr('y',(d,i)=>legendTop+28*(i+1))
		.attr('width',24)
		.attr('height',24)
		.attr("fill",d=>fillScale(levels.fill.indexOf(d)))
		.classed('notgg-legend-fill',true);

		svg.selectAll('.notgg-legend-key')
		.data(levels.fill)
		.enter()
		.append('text')
		.attr('x',d=>internal.width-internal.padding.right+30)
		.attr('y',(d,i)=>legendTop+28*(i+1)+.65*28)
		.text(d=>d)
		.classed('notgg-legend-key',true);
	}
}