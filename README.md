# notggplot
========================================================

Overview
--------

A javascript graphing library that's not ggplot, offering a high-level, declarative syntax for embedding graphs in webpages using the [d3.js framework](https://d3js.org/). This is a proof-of-concept in early stages of development.

`src` contains the uncompiled css and javascript files for `notggplot`, with one function per file. It does not contain the required `d3.js` framework file.

`test` contains some loosely structured tests. The javascript files each contain one or more tests, while `index.html` links the javascript files. Opening `index.html` in a browser will run the tests and, where appropriate, display the output graphs, while failed tests will throw exceptions in the console.

Installation
------------

First, link to the `d3.js` version 5

```html
<script src="https://d3js.org/d3.v5.min.js"></script>
```

Then add links to all the files in `src`:

```html
    <link rel="stylesheet" type="text/css" href="../src/notggplot.css">	
    <script type="text/javascript" src="../src/mergeMapping.js"></script>
    <script type="text/javascript" src="../src/notggplot.js"></script>
    <script type="text/javascript" src="../src/seq.js"></script>
    <script type="text/javascript" src="../src/setMethods.js"></script>
    <script type="text/javascript" src="../src/cumsum.js"></script>
    <script type="text/javascript" src="../src/isCategorical.js"></script>
    <script type="text/javascript" src="../src/lightclone.js"></script>
    <script type="text/javascript" src="../src/make_majorGrid.js"></script>
    <script type="text/javascript" src="../src/makeAxis.js"></script>
    <script type="text/javascript" src="../src/makeLegend.js"></script>
    <script type="text/javascript" src="../src/makePlot.js"></script>
    <script type="text/javascript" src="../src/mappingResolver.js"></script>
    <script type="text/javascript" src="../src/mapDataset.js"></script>
    <script type="text/javascript" src="../src/getLevelsOfMappingVariables.js"></script>
    <script type="text/javascript" src="../src/isDate.js"></script>
    <script type="text/javascript" src="../src/isNumeric.js"></script>
    <script type="text/javascript" src="../src/getScale.js"></script>
    <script type="text/javascript" src="../src/fillAesthetic.js"></script>
    <script type="text/javascript" src="../src/consolidateMapping.js"></script>
```

This will run in Chrome 66 and most modern browsers. You will need to [transpile](https://babeljs.io/) for compatibility with pre-ES6 browsers including Internet Explorer 11.

Usage
-----

The `notggplot` library uses method chaining to create immutable plot objects. Start by instancing `notggplot`, then add geometries and elements by calling methods, which will return a new `notggplot` object with the added elements, but will not modify the original object. 

Data should be an `Array` of object literals with the column names as property keys. For example a dataset of annual time series data with a `Date` and a `Value` column would look like:
```js
let data=[
	{Date:new Date(2016,01,01),Value:3.3},
	{Date:new Date(2017,01,01),Value:54.3},
	{Date:new Date(2018,01,01),Value:4.98}
];
```

The names of the x and y axis variables, as well as other aesthetic mappings are passed as an object literal to the optional mappings parameter. Aesthetic mappings follow the [Grammar of Graphics](https://www.amazon.com/Grammar-Graphics-Statistics-Computing/dp/0387245448) philosophy, and instruct `notggplot` how to correlate position, shape, and style of geometries in the graph to the variables in the dataset. The dataset and mappings can be passed either in the top `notggplot` or in the subsequent geometries.

To terminate the `notggplot` method chain and return a `d3.js` object, call the `.gg()` method. The `.node()` method returns the generated SVG node bearing the graph, which can then be appended to the DOM.

Create a basic bar chart and embed it in the web page:

```js
let data=getData();

let plot=new notggplot({mapping:{x:'group',y:'count',fill:'category'},data:data})
	.geom_col();

document.body.appendChild(plot.node());
```

Create a scatterplot with `z` on the x-axis and `count` on the y-axis, coloring each point by `category` 

```js
let data=getData();

let plot=new notggplot({mapping:{x:'Date',y:'count',fill:'group'},data:data})
	.geom_point({size:2});

document.body.appendChild(plot.node());
```

The `test` files pretty much spell out examples of all of the currently supported use cases. 