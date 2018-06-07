function getScale(domain,range) {
	if(isCategorical(domain)){
		return d3.scaleBand()
			.domain(domain)
			.range(range)
			.round(true)
			.padding(0.2);
	}else if(isDate(domain)){
		return d3.scaleTime()
			.domain(domain)
			.range(range);
	}else if(isNumeric(domain)){
		return d3.scaleLinear()
			.domain(domain)
			.range(range)
	}
}