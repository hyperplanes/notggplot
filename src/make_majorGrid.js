function make_majorGrid(svg,internal){
    var xAxisG=svg.append("g");
    var yAxisG=svg.append("g");    


    var yAxis2 = d3.axisLeft()
        .scale(internal.yScale)
        .ticks((internal.height-internal.padding.top-internal.padding.bottom)/internal.tickEvery)
        .tickSizeInner(-(internal.width - internal.padding.left-internal.padding.right))
        .tickFormat("");

    yAxisG.classed("notgg-grid",true)
        .attr("transform", "translate(" + internal.padding.left + ",0)")
        .call(yAxis2);
    
	var xAxis2 = d3.axisBottom()
        .scale(internal.xScale)
        .ticks((internal.width-internal.padding.left-internal.padding.right)/internal.tickEvery)
        .tickSizeInner(-(internal.height - 2 * internal.padding.bottom))
        .tickFormat("");

    xAxisG.classed("notgg-grid",true)
        .attr("transform", "translate(0," + (internal.height- internal.padding.bottom) + ")")
        .call(xAxis2);
    //old    

    if('panel_grid_major' in internal){
    	var y=yAxisG.selectAll(".notgg-grid .tick line");
    	var x=xAxisG.selectAll(".notgg-grid .tick line");

		if('colour' in internal.panel_grid_major){
			y.style('stroke',internal.panel_grid_major.colour);
			x.style('stroke',internal.panel_grid_major.colour);
		}
		if('size' in internal.panel_grid_major){
			y.style('stroke-width',internal.panel_grid_major.size);
			x.style('stroke-width',internal.panel_grid_major.size);
		}
		if('linetype' in internal.panel_grid_major){
			y.classed('notgg-'+internal.panel_grid_major.linetype,true);
			x.classed('notgg-'+internal.panel_grid_major.linetype,true);    		
		}
		/*if('lineend' in internal.panel_grid_major){
			y.style(,internal.panel_grid_major.lineend);
			x.style(,internal.panel_grid_major.lineend);
		}
		if('arrow' in internal.panel_grid_major){
			y.style(,internal.panel_grid_major.arrow);
			x.style(,internal.panel_grid_major.arrow);
		}*/
    	if('stroke-dasharray' in internal.panel_grid_major){
    		x.attr('stroke-dasharray',internal.panel_grid_major['stroke-dasharray']);
    		y.attr('stroke-dasharray',internal.panel_grid_major['stroke-dasharray']);
    	}

    }
}