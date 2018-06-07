function makeAxis(svg, internal){
	'use strict';
	//make axes
	var xAxis = d3.axisBottom()
		.scale(internal.xScale)
		.ticks((internal.width-internal.padding.left-internal.padding.right)/internal.tickEvery);

	var yAxis = d3.axisLeft()
		.scale(internal.yScale)
		.ticks((internal.height-internal.padding.top-internal.padding.bottom)/internal.tickEvery);

	//save the elements
	var xAxisG=svg.append("g")
		.attr("class", "notgg-axis");
    var yAxisG=svg.append("g")
		.attr("class", "notgg-axis");   
	
	//draw the axes
	xAxisG.attr("transform", "translate(0," + (internal.height- internal.padding.bottom) + ")")
		.call(xAxis);

	yAxisG.attr("transform", "translate(" + internal.padding.left + ",0)")
		.call(yAxis);

	//apply themes
    if('axis_line'in internal){
    	var y=yAxisG.selectAll("path");
    	var x=xAxisG.selectAll("path");

		if('colour' in internal.axis_line){
			y.style('stroke',internal.axis_line.colour);
			x.style('stroke',internal.axis_line.colour);
		}
		if('size' in internal.axis_line){
			y.style('stroke-width',internal.axis_line.size);
			x.style('stroke-width',internal.axis_line.size);
		}
		if('linetype' in internal.axis_line){
			y.classed('notgg-'+internal.axis_line.linetype,true);
			x.classed('notgg-'+internal.axis_line.linetype,true);    		
		}
		/*if('lineend' in internal.axis_line){
			y.style(,internal.axis_line.lineend);
			x.style(,internal.axis_line.lineend);
		}
		if('arrow' in internal.axis_line){
			y.style(,internal.axis_line.arrow);
			x.style(,internal.axis_line.arrow);
		}*/
    	if('stroke-dasharray' in internal.axis_line){
    		x.attr('stroke-dasharray',internal.axis_line['stroke-dasharray']);
    		y.attr('stroke-dasharray',internal.axis_line['stroke-dasharray']);
    	}

    }
}