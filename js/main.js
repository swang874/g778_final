//Scriptsheet by Shujin Wang, 2020

// -------------------- apply to all maps --------------------
// set map and chart size
var width = 620, height = 410;
var chartWidth = 360, chartHeight = height/2;
// set projection
var projection = d3.geoAlbersUsa().scale(800).translate([310, 200])
var path = d3.geoPath().projection(projection);
var projection2 = d3.geoMercator().scale(500).translate([1210, 610]);
var path2 = d3.geoPath().projection(projection2);
// set time series
var dataTime = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
// opening
var opening = d3.select(".whitebgd").append("p").style("padding", "50px").style("font-size", "16px").style("background-color", "#e6e6e6")
  .text("In the United States there are about 120,000 beekeepers and 2.7 million honey-producing colonies that generated 1.5 million pounds of raw honey. The market of honey is very strong. The annual income from direct honeybee pollination to US agriculture is estimated at $440 million per year, far exceeding the value of wax and honey sales. The bee-keeping industry is easily accessible and segmented into three types of production: hobbyist (25 colonies or less), part-time (25 to 300 colonies) and commercial (over 300 colonies). Hobbyists and part-timers account for roughtly 40 percent of the honey production. During the last 30 years, US honey production experienced a decline. Actually the worldwide bee colony collapse is not a mystery. Professionals have made efforts for years to save the bees. What is the current status of US honey industry? First, let's look into the honeybee colonies.")

// -------------------- prepare for the first map --------------------
var firstmap = d3.select(".whitebgd").append("div").attr("class", "firstmap").style("position", "relative");
var title1div = d3.select(".firstmap").append("div").attr("class", "title1div").style("text-align", "center")
var title1 = d3.select(".title1div").append("img").attr("src", "/img/title1.jpg").attr("width", 350)
// invisible canvas for states
var polyCanvas = d3.select(".firstmap")
	.append("canvas")
	.attr("width", width)
	.attr("height", height)
	.style("display", "none");
// visible svg for states
var map1 = d3.select(".firstmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
// visible canvas for dots
var dotCanvas = d3.select(".firstmap")
	.append("canvas")
	.attr("width", width)
	.attr("height", height)
	.style("position", "absolute")
	.style("right", '0px')
  .style("left", '0px')
	.style("top", '131px')
	.style("margin-left", "auto")
	.style("margin-right", "auto");
// visible svg for states
var map1hover = d3.select(".firstmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("position", "absolute")
	.style("right", '0px')
  .style("left", '0px')
	.style("top", '131px')
	.style("margin-left", "auto")
	.style("margin-right", "auto");
// div for slider
var slider1 = d3.select(".firstmap")
	.append("div")
	.attr("id", "slider-time1")
// create coordinate system for canvases
var polyContext = polyCanvas.node().getContext("2d");
var dotContext = dotCanvas.node().getContext("2d");
// others
var figure1 = d3.select(".firstmap").append("div").attr("class", "figure1").style("text-align", "center")
var figure1_2 = d3.select(".figure1").append("img").attr("src", "/img/figure1_2.jpg").attr("width", 400)
var figure1_1 = d3.select(".figure1").append("img").attr("src", "/img/figure1_1.jpg").attr("width", 400)
var text1 = d3.select(".firstmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("In 2019, there are totally 2.782 million bee colonies in US. The colonies are distributed unevenly. North Dakota and South Dakota always have the highest density of bee colonies, followed by Florida and California. Montana is another major state regarding the total number. Generally, there are more colonies in the north than the south. Over the past 10 years, the number of bee colonies increased slightly, but the spatial distribution rarely changed. However, as we have a 10% increase in colony amount, does that mean we can expect a significant increase in honey production?")

// -------------------- prepare for the second map --------------------
var secondmap = d3.select(".whitebgd").append("div").attr("class", "secondmap")
var figure2_1 = d3.select(".secondmap").append("img").attr("src", "/img/figure2_1.jpg").attr("width", 550).style("float", "left")
var text2_1 = d3.select(".secondmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("Over the past 10 years, there was a relationship between the total honey production in US and the total number of bee colonies in some specific years, for example, they both dropped dramatically in 2011 and both went up in 2014. However, for the 10-year trend, the honey production did not increase as we expected to see, and since 2014, it has actually tended to decrease. This is the result of a drop in yield. Over the past 10 years, the trend of yield per colony perfectly fitted the trend of production. As we are now having an unsatisfactory honey production and yield in US, does every state suffer the same?")
var title2div = d3.select(".secondmap").append("div").attr("class", "title2div").style("text-align", "center")
var title2 = d3.select(".title2div").append("img").attr("src", "/img/title2.jpg").attr("width", 800)
// svg for map
var map2 = d3.select(".secondmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("float", "left");
// svgs for two barcharts
var barchart = d3.select(".secondmap").append("div").attr("class", "barchart")
var barchart1 = d3.select(".barchart")
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)
	.attr("class", "barchart");
var barchart2 = d3.select(".barchart")
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", chartHeight)
	.attr("class", "barchart");
// div for slider
var slider2 = d3.select(".secondmap")
	.append("div")
	.attr("id", "slider-time2")
// others
var text2_2 = d3.select(".secondmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("Although there is a nationwide decrease in honey production and yield in recent years, a few states, such as Hawaii, Mississippi, Louisiana, Montana, and North Dakota, have been maintaining a high yield (i.e., greater than 70 pounds per colony) for over 10 years. Among these states, before 2015, Mississippi always had the highest yield, and Hawaii became the top 1 after 2015. In the recent two or three years, Ohio and Kansas have also made great progress. Over the 10 years, the overall performance of states on the east and west coast was poor. As for the total production, North Dakota is always far ahead of other states. States with more bee colonies generally got a larger honey production as well. Based on bee colony amount, honey production and yield, North Dakota is the exact state that leads US in honey industry.")
var text2_3 = d3.select(".secondmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("Why are some states perfect for beekeeping? North Dakota for example, has just the right climate - warm days and cool nights that are optimal for nectar secretion for a number of plants that honeybees visit. In addition, it is not too drought like states farther west, and there is still uncultivated land left. However, recent research already found that the advantages of North Dakota seems to be on the wane because of the expansion of corn and soybeans. These crops not only cut into bees' forage options, but also bring other stressors like pesticides. These may explain why the honey yield decreased, and even worse, extra bee colonies might have been lost abnormally!")

// -------------------- prepare for the third map --------------------
var thirdmap = d3.select(".whitebgd").append("div").attr("class", "thirdmap")
var title3div = d3.select(".thirdmap").append("div").attr("class", "title3div").style("text-align", "center")
var title3 = d3.select(".title3div").append("img").attr("src", "/img/title3.jpg").attr("width", 680)
// svg for map
var map3 = d3.select(".thirdmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("float", "left");
var barchart3 = d3.select(".thirdmap")
	.append("svg")
	.attr("width", chartWidth)
	.attr("height", height);
// div for slider
var slider3 = d3.select(".thirdmap")
	.append("div")
	.attr("id", "slider-time3")
// others
var figure3_1 = d3.select(".thirdmap").append("img").attr("src", "/img/figure3_1.jpg").attr("width", 380).style("float", "left")
var text3_1 = d3.select(".thirdmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("Normally, the bee colony loss has a seasonal pattern, where we lose much more during winter than summer. From April 2018 to March 2019, an average beekeeper in US lost 40.7 percent of his/her bee colonies (then he/she had to add new ones). Particularly, the winter loss was 37.7 percent, which is the highest winter loss ever and is 8.9 percent points higher than the 13-year average. The result was very concerning because the industry has already suffered from a decade of high winter losses! From April 2019 to March 2020, 43.7 percent of US bee colonies were lost, and this year, the second highest summer loss is remarkable. Researchers believe that the high summer loss was still a reflection of the last poor winter.")
var text3_2 = d3.select(".thirdmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("Over the past two years, New Mexico and Arkansas suffered extreme losses. States in the south and states close to the Great Lakes generally lost more colonies, especially during winter. One interesting fact is that the rest of country tended to have a higher summer loss than winter loss. During the past two years, to most states, varroa mites are the most significant colony health stressor and almost half of colonies suffered from it. Other pests and pesticides are also destructive. These health stressors affected bee colonies' productivity, and threatened the colonies' survival.")
var figure3_2 = d3.select(".thirdmap").append("img").attr("src", "/img/figure3_2.jpg").attr("width", 380).style("float", "left").style("padding-left", "50px").style("padding-right", "30px")
var text3_3 = d3.select(".thirdmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("While honey production in US tends to continue declining due to mutiple reasons, the demand of honey has been rising. According to the National Honey Board, between 2012 and 2015, the consumption of liquid honey grew by over 25 percent. It is also reported that Americans are consuming more honey crystals. Additionally, honey is being added to more foods and even wine. USDA data indicates that US per capita consumption of honey has reached 1.51 pounds per person. Resulted from the growing demand and the weak production, the nationwide honey price has significantly risen. How did it rise?")

// -------------------- prepare for the forth map --------------------
var forthmap = d3.select(".whitebgd").append("div").attr("class", "forthmap")
var title4div = d3.select(".forthmap").append("div").attr("class", "title4div").style("text-align", "center")
var title4 = d3.select(".title4div").append("img").attr("src", "/img/title4.jpg").attr("width", 680)
var map4 = d3.select(".forthmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
// div for slider
var slider4 = d3.select(".forthmap")
	.append("div")
	.attr("id", "slider-time4")
// others
var figure4_1 = d3.select(".forthmap").append("img").attr("src", "/img/figure4_1.jpg").attr("width", 400).style("float", "left")
var text4_1 = d3.select(".forthmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("From 2010 to 2014, the honey price went up rapidy until 2014 when the honey production peaked up. The honey price then dropped a little bit and increased slowly until 2018. In 2019, for some reasons (e.g., the honey production climbed slightly), the price dropped a lot. Spatially, Virginia and New Jersey were always first two states that responded to the rising price. States in the eastsouth and states close to the Great Lakes have higher honey price, and the price did not drop when there was a nationwide trend of decline. The highest price is 5 times of the lowest price!")
var text4_2 = d3.select(".forthmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("In early years, to make up for the shortfall in honey production, the US has largely increased honey imports from other countries. In 1900, we produced over 90,000 tonnes of honey and imported roughly 35,000 tones. In 2015, we produced 71,000 tonnes and imported 175,000 tonnes. The US has become the world's largest importer of honey, accounting for just under a quarter of global imports. Where do we import honey from?")

// -------------------- prepare for the fifth map --------------------
var fifthmap = d3.select(".whitebgd").append("div").attr("class", "fifthmap")
var title5div = d3.select(".fifthmap").append("div").attr("class", "title5div").style("text-align", "center")
var title5 = d3.select(".title5div").append("img").attr("src", "/img/title5.jpg").attr("width", 350)
// svg for buttons
var allButtons = d3.select(".fifthmap")
  .append("svg")
  .attr("class", "allButtons")
// draw initial map
var map5 = d3.select(".fifthmap")
	.append("div")
	.attr("class", "fifthmapdiv")
	.style("text-align", "center")
var map5exim = d3.select(".fifthmapdiv")
	.append("img")
	.attr("src", "/img/ex.jpg")
	.attr("width", 800)
// click button and update
var radio = [{"name": "ex"}, {"name": "im"}]
var button = allButtons.selectAll(".button")
  .data(radio)
	.enter()
	.append("rect")
	.attr("width", 145)
	.attr("height", 50)
  .attr("class", function(d){
		return "button " + d.name
	})
  .style("fill", "#e6e6e6")
	.attr("x", function(d, i){
		return i * 155
	})
  .on("click", function(d, i){
		map5.selectAll("*").remove();
		var map5exim = d3.select(".fifthmapdiv")
		  .append("img")
			.attr("src", "/img/" + d.name + ".jpg")
			.attr("width", 800)
  })
	.on("mouseover", function(d){
		var sb = allButtons.selectAll(".button" + "." + d.name)
		  .style("opacity", 0.5)
	})
	.on("mouseout", function(d){
		var sb = allButtons.selectAll(".button" + "." + d.name)
		  .style("opacity", 1)
	})
var buttonlabel = allButtons.selectAll(".buttonlabel")
  .data(radio)
	.enter()
	.append("text")
  .attr("class", function(d){
		return d.name
	})
	.text(function(d){
		return d.name + "portation (tons)"
	})
	.attr("x", function(d, i){
		return i * 155 + 16
	})
	.attr("y", 30)
  .on("click",function(d, i) {
		map5.selectAll("*").remove();
		var map5exim = d3.select(".fifthmapdiv")
		  .append("img")
			.attr("src", "/img/" + d.name + ".jpg")
			.attr("width", 800)
  })
	.on("mouseover", function(d){
		var sb = allButtons.selectAll(".button" + "." + d.name)
		  .style("opacity", 0.5)
	})
	.on("mouseout", function(d){
		var sb = allButtons.selectAll(".button" + "." + d.name)
		  .style("opacity", 1)
	})
// others
var text5_1 = d3.select(".fifthmap").append("p").style("padding-left", "50px").style("padding-right", "50px").style("font-size", "16px")
  .text("In 2018 the US imported over 190,000 tonnes of honey. Our honey are mosty from three countries: India, Vietnam and Argentina, which altogether account for nearly 63 percent of US honey imports. We also exported 3,700+ tonnes of honey to a few countries like Philippines and Canada.")
var lastdiv = d3.select(".fifthmap").append("div").attr("class", "lastdiv").style("text-align", "center")
var last = d3.select(".lastdiv").append("img").attr("src", "/img/last.jpg").attr("width", 950)

// -------------------- draw all maps --------------------
// load data and call the callback function when ready
var promises = [];
promises.push(d3.json("data/states.topojson"));
promises.push(d3.json("data/centroids.topojson"));
promises.push(d3.json("data/hex.topojson"));
Promise.all(promises).then(callback);
// callback function
function callback(data){
	// select data
	statesdata = data[0]
	centroidsdata = data[1]
	hexdata = data[2]
	var states = topojson.feature(statesdata, statesdata.objects.states).features;
	var centroids = topojson.feature(centroidsdata, centroidsdata.objects.centroids).features;
  var hex = topojson.feature(hexdata, hexdata.objects.hex).features;

  // -------------------- draw the first map --------------------
	// on the invisible canvas draw each state in a specific color
	var i = states.length;
	while(i--){
		var r = parseInt(i/256),
				g = i%256;
		drawPolygon(states[i], polyContext, "rgb(" + r + "," + g + ",0)");
	};
	// convert the invisible canvas to pixel image
	var imageData = polyContext.getImageData(0, 0, width, height);
  // create time slider
  var sliderTime = d3.sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .width(300)
    .tickFormat(d3.format(''))
    .ticks(10)
		.step(1)
    .default(2019)
		.on('onchange', val => {
			dotContext.clearRect(0, 0, width, height);
			drawMap1(states, imageData, "colony" + (d3.format('')(val) - 2000).toString());
			drawMap1H(states, map1hover, "colony" + (d3.format('')(val) - 2000).toString());
    });
  var gTime = d3.select('div#slider-time1')
    .append('svg')
    .attr('width', 360)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30, 30)');
  gTime.call(sliderTime);
  // draw initial map
	drawBasemap(states, map1);
  drawMap1(states, imageData, "colony19");
	drawMap1H(states, map1hover, "colony19");

	// -------------------- draw the second map --------------------
	// create color scale and size scale
	var colorscale = makeColorScale([1, 40, 55, 70]);
	var colorscale2 = makeColorScale([1, 1000, 10000, 30000]);
	var size = d3.scaleLinear()
    .domain([0, 47000])
    .range([4, 50])
	var yScale1 = d3.scaleLinear()
    .range([10, chartHeight])
    .domain([0, 100]);
	var yScale2 = d3.scaleLinear()
    .range([10, chartHeight])
    .domain([0, 47000]);
	// dral initial map
	drawMap2(states, map2, colorscale, "yield19");
	drawMap2bb(centroids, size, "product19");
  drawBar(states, barchart1, colorscale, yScale1, "yield19");
	drawBar(states, barchart2, colorscale2, yScale2, "product19");
	// create time slider
  var sliderTime = d3.sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .width(300)
    .tickFormat(d3.format(''))
    .ticks(10)
		.step(1)
    .default(2019)
		.on('onchange', val => {
			map2.selectAll("*").remove();
			barchart1.selectAll("*").remove();
			barchart2.selectAll("*").remove();
			drawMap2(states, map2, colorscale, "yield" + (d3.format('')(val) - 2000).toString());
			drawMap2bb(centroids, size, "product" + (d3.format('')(val) - 2000).toString());
			drawBar(states, barchart1, colorscale, yScale1, "yield" + (d3.format('')(val) - 2000).toString());
			drawBar(states, barchart2, colorscale2, yScale2, "product" + (d3.format('')(val) - 2000).toString());
    });
  var gTime = d3.select('div#slider-time2')
    .append('svg')
    .attr('width', 360)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30, 30)');
  gTime.call(sliderTime);

	// -------------------- draw the third map --------------------
	var colorscale3 = makeColorScale([0.5, 10, 20, 30]);
	var yScale3 = d3.scaleLinear()
    .range([0, height])
    .domain([0, 120]);
	// dral initial map
	drawMap3(states, map3, colorscale3, "19lostM", yScale3);
	// create time slider
	var dataTime2 = d3.range(0, 3).map(function(d) {
    return new Date(2017 + d, 2, 15);
  });
	var sliderTime = d3.sliderBottom()
	  .min(d3.min(dataTime2))
	  .max(d3.max(dataTime2))
	  .step(1000 * 60 * 60 * 24 * 91)
	  .width(300)
	  .tickFormat(d3.timeFormat('%B %Y'))
	  .tickValues(dataTime2)
 	  .default(new Date(2019, 2, 15))
		.on('onchange', val => {
			map3.selectAll("*").remove();
			drawMap3(states, map3, colorscale3, (d3.timeFormat('%Y')(val)-2000).toString() + "lost" + (d3.timeFormat('%B')(val)[0]), yScale3);
		});
  var gTime = d3.select('div#slider-time3')
    .append('svg')
    .attr('width', 360)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30, 30)');
  gTime.call(sliderTime);

	// -------------------- draw the forth map --------------------
  var colorscale4 = makeColorScale([1, 200, 400, 600]);
	// dral initial map
	drawHex(hex, colorscale4, "price19");
	// create time slider
  var sliderTime = d3.sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .width(300)
    .tickFormat(d3.format(''))
    .ticks(10)
		.step(1)
    .default(2019)
		.on('onchange', val => {
			map4.selectAll("*").remove();
			drawHex(hex, colorscale4, "price" + (d3.format('')(val) - 2000).toString());
    });
  var gTime = d3.select('div#slider-time4')
    .append('svg')
    .attr('width', 360)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30, 30)');
  gTime.call(sliderTime);
};

// -------------------- all other functions --------------------
// map1: function to test the random dot
function testPixelColor(imageData, x, y, w, r, g){
	var index = (x + y*w) * 4;
	return imageData.data[index + 0] == r && imageData.data[index + 1] == g;
}

// map1: function to draw states on the invidible canvas
function drawPolygon(feature, context, fill){
	var coordinates = feature.geometry.coordinates;
	context.fillStyle = fill || "#000";
	context.beginPath();
	if (coordinates.length < 2){
		coordinates.forEach(function(ring){
			ring.forEach(function(coord, i){
				var projected = projection(coord);
				if (i == 0){
          context.moveTo(projected[0], projected[1]);
        } else {
          context.lineTo(projected[0], projected[1]);
        }
			});
		});
  } else {
		coordinates.forEach(function(a){
			a.forEach(function(ring){
				ring.forEach(function(coord, i){
					var projected = projection(coord);
					if (i == 0){
            context.moveTo(projected[0], projected[1]);
          } else {
            context.lineTo(projected[0], projected[1]);
          }
				});
			});
		});
	}
	context.closePath();
	context.fill();
}

// map1: function to draw actural dots
function drawPixel(x, y, r, g, b, a){
	dotContext.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a/255) + ")";
	dotContext.fillRect(x, y, 1.5, 1.5);
}

// map1: on the visible svg draw each state in the same color
function drawBasemap(states, location){
	var basestates = location.selectAll(".basestates")
		.data(states)
		.enter()
		.append("path")
		.attr("class", function(d){
			return "basestates " + d.properties.name;
		})
		.attr("d", path);
}

// map1: on the invisible svg draw each state
function drawMap1H(states, location, field){
	var tip1 = d3.tip()
		.attr('class', 'd3-tip')
		.offset([0, 0])
		.html(function(d) {
			if (d.properties[field] !== 0) {
				return d.properties.name + ": " + d.properties[field]
			} else {
				return d.properties.name + ": No Data"
			}
		})
	map1hover.call(tip1);
	var hoverstates = location.selectAll(".hoverstates")
		.data(states)
		.enter()
		.append("path")
		.attr("class", function(d){
			return "hoverstates " + d.properties.name;
		})
		.attr("d", path)
		.on('mouseover.t', tip1.show)
		.on('mouseover', function(d){
	    var selected = map1hover.selectAll(".hoverstates" + "." + d.properties.name)
				.style("opacity", 0.4);
		})
    .on('mouseout.t', tip1.hide)
		.on('mouseout', function(d){
	    var selected = map1hover.selectAll(".hoverstates" + "." + d.properties.name)
        .style("opacity", 0);
		})
}

// map1: on the visible canvas draw dots
function drawMap1(states, imageData, attribute){
	i = states.length;
	while(i--){
    // for each state get colony number data and continue
		var colony = states[i].properties[attribute] / 1000; // one dot = 1000 colonies
		if (!colony) continue;
		// create bounding box for each state
		var bounds = path.bounds(states[i]),
			x0 = bounds[0][0],
			y0 = bounds[0][1],
			w = bounds[1][0] - x0,
			h = bounds[1][1] - y0,
			hits = 0,
			count = 0,
			limit = colony*10,
			x,
			y,
			r = parseInt(i/256),
			g = i%256;
		// find a random dot within the bounding box
		while(hits < colony && count < limit){
			x = parseInt(x0 + Math.random()*w);
			y = parseInt(y0 + Math.random()*h);
			// if the random dot is inside the state then draw it
			if (testPixelColor(imageData, x, y, width, r, g)){
				drawPixel(x, y, 253, 141, 60, 255);
				hits++;
			}
			count++;
		}
	}
}

// map2: function to create color scale generator
function makeColorScale(threshold){
	colorscale = d3.scaleThreshold()
    .domain(threshold)
    .range(["#e6e6e6", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"]);
	return colorscale;
};

// map2: draw choropleth
function drawMap2(states, location, colorscale, field){
	var tip2 = d3.tip()
		.attr('class', 'd3-tip')
		.offset([0, 0])
		.html(function(d) {
			if (d.properties[field] !== 0) {
				return d.properties.name + ":<br/>Production: " + d.properties["product" + field.slice(-2)] + " x 1000 pounds<br/>Yield per colony: " + d.properties["yield" + field.slice(-2)] + " pounds"
			} else {
				return d.properties.name + ": No Data"
			}
		})
	map2.call(tip2);
	var states2 = location.selectAll(".states2")
		.data(states)
		.enter()
		.append("path")
		.attr("class", function(d){
			return "states2 " + d.properties.name;
		})
		.attr("d", path)
		.style("fill", function(d){
			var value = d.properties[field];
			return colorscale(value);
		})
		.on('mouseover.t', tip2.show)
		.on('mouseover', function(d){
	    var selected = secondmap.selectAll("." + d.properties.name)
        .style("opacity", 0.5);
		})
    .on('mouseout.t', tip2.hide)
		.on('mouseout', function(d){
	    var selected = secondmap.selectAll("." + d.properties.name)
        .style("opacity", 1);
		})
}

// map2: draw proportional symbols
function drawMap2bb(centroids, size, field){
	var tip2 = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([0, 0])
	  .html(function(d) {
			if (d.properties[field] !== 0) {
				return d.properties.name + ":<br/>Production: " + d.properties["product" + field.slice(-2)] + " x 1000 pounds<br/>Yield per colony: " + d.properties["yield" + field.slice(-2)] + " pounds"
			} else {
				return d.properties.name + ": No Data"
			}
	  })
	map2.call(tip2);
	var symbols = map2.selectAll(".symbols")
		.data(centroids)
		.enter()
		.append("circle")
			.attr("cx", function(d){ return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0] })
			.attr("cy", function(d){ return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] })
			.attr("r", function(d){
				if (d.properties[field] > 0){
					return size(d.properties[field])
				}
			})
			.style("fill", "white")
			.attr("stroke", "black")
			.attr("stroke-width", 1)
			.attr("fill-opacity", 0)
			.on('mouseover.t', tip2.show)
			.on('mouseover', function(d){
		    var selected = secondmap.selectAll("." + d.properties.name)
	        .style("opacity", 0.5);
			})
	    .on('mouseout.t', tip2.hide)
			.on('mouseout', function(d){
		    var selected = secondmap.selectAll("." + d.properties.name)
	        .style("opacity", 1);
			})
}

// map2: draw bar chart
function drawBar(states, location, colorscale, yScale, field){
	var tip2bar = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([0, 0])
	  .html(function(d) {
			if (d.properties[field] !== 0) {
				if (field[0] == "p"){
					return d.properties.name + "<br/>Production: " + d.properties[field] + " x 1000 pounds"
				} else {
					return d.properties.name + "<br/>Yield per colony: " + d.properties[field] + " pounds"
				}
			} else {
				return d.properties.name + ": No Data"
			}
	  })
	barchart1.call(tip2bar);
	barchart1.call(tip2bar);
	var bars = location.selectAll(".bars")
		.data(states)
		.enter()
		.append("rect")
		.sort(function(a, b){
			return b.properties[field]-a.properties[field]
		})
		.attr("class", function(d){
			return "bars " + d.properties.name;
		})
		.on('mouseover.t', tip2bar.show)
		.on('mouseover', function(d){
			var selected = secondmap.selectAll("." + d.properties.name)
				.style("opacity", 0.5);
		})
		.on('mouseout.t', tip2bar.hide)
		.on('mouseout', function(d){
			var selected = secondmap.selectAll("." + d.properties.name)
				.style("opacity", 1);
		})
	bars.attr("width", chartWidth / states.length - 1)
		.attr("x", function(d, i){
			return i * (chartWidth / states.length);
		})
		.attr("height", function(d){
			return yScale(d.properties[field]);
		})
		.attr("y", function(d){
			return chartHeight - yScale(d.properties[field]);
		})
		.style("fill", function(d){
			var value = d.properties[field];
			return colorscale(value);
		})
	var chartTitle = location.append("text")
		.attr("x", 120)
		.attr("y", 30)
		.attr("class", "chartTitle")
		.text(field.substring(0, field.length-2));
}

// map3: draw choropleth
function drawMap3(states, location, colorscale, field, yScale){
	var tip3 = d3.tip()
		.attr('class', 'd3-tip')
		.offset([0, 0])
		.html(function(d) {
			if (d.properties[field] !== 0) {
				return d.properties.name + ": " + d.properties[field] + "%"
			} else {
				return d.properties.name + ": No Data"
			}
		})
	map3.call(tip3);
	var states3 = location.selectAll(".states3")
		.data(states)
		.enter()
		.append("path")
		.attr("class", function(d){
			return "states3 " + d.properties.name;
		})
		.attr("d", path)
		.style("fill", function(d){
			var value = d.properties[field];
			return colorscale(value);
		})
		.on('mouseover.t', tip3.show)
		.on('mouseover', function(d){
	    var selected = map3.selectAll(".states3" + "." + d.properties.name)
        .style("opacity", 0.5);
		})
		.on('mouseover.b', function(d){
	    var vm = d.properties["vm" + field.substring(0, 2) + field[6]]
			var opp = d.properties["opp" + field.substring(0, 2) + field[6]]
			var dd = d.properties["d" + field.substring(0, 2) + field[6]]
			var pp = d.properties["p" + field.substring(0, 2) + field[6]]
			var oo = d.properties["o" + field.substring(0, 2) + field[6]]
			var uu = d.properties["u" + field.substring(0, 2) + field[6]]
      var lostdata = [{"name": "Varroa Mites", "value": vm}, {"name": "Other Pests", "value": opp}, {"name": "Diseases", "value": dd}, {"name": "Pesticides", "value": pp}, {"name": "Other", "value": oo}, {"name": "Unknown", "value": uu}]
      if (d.properties.vm19M !== 0){
				var bars3 = barchart3.selectAll(".bars3")
					.data(lostdata)
					.enter()
					.append("rect")
					.attr("class", function(d){
						return "bars3 " + d.name;
					})
				bars3.attr("width", chartWidth / 6 - 20)
					.attr("x", function(d, i){
						return i * (chartWidth / 6);
					})
					.attr("height", function(d){
						return yScale(d.value);
					})
					.attr("y", function(d){
						return height - yScale(d.value) - 20;
					})
					.style("fill", "#fd8d3c")
				var numbers = barchart3.selectAll(".numbers")
	        .data(lostdata)
	        .enter()
	        .append("text")
	        .attr("class", function(d){
	            return "numbers";
	        });
				var chartTitle = barchart3.append("text")
	        .attr("x", 100)
	        .attr("y", 20)
	        .attr("class", "chartTitle")
	        .text("Colony Health Stressors");
				numbers.attr("text-anchor", "middle")
	        .attr("x", function(d, i){
	          var fraction = chartWidth / 6;
	          return i * fraction + (fraction - 1) / 3;
	        })
	        .attr("y", function(d){
	          return height - yScale(d.value) - 25;
	        })
	        .text(function(d){
	          return d.value + "%";
	        })
				var numberslabel = barchart3.selectAll(".numberslabel")
	        .data(lostdata)
	        .enter()
	        .append("text")
	        .attr("class", function(d){
	            return "numberslabel";
	        });
				numberslabel.attr("text-anchor", "middle")
	        .attr("x", function(d, i){
	          var fraction = chartWidth / 6;
	          return i * fraction + (fraction - 1)/2;
	        })
	        .attr("y", function(d){
	          return height - yScale(d.value) - 45;
	        })
	        .text(function(d){
	          return d.name;
	        })
					.style("font-size", "10px");
			}
		})
    .on('mouseout.t', tip3.hide)
		.on('mouseout', function(d){
	    var selected = map3.selectAll(".states3" + "." + d.properties.name)
        .style("opacity", 1);
		})
		.on('mouseout.b', function(d){
			barchart3.selectAll("*").remove()
		})
}

// map4: draw hex map
function drawHex(data, colorscale, field){
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([0, 0])
	  .html(function(d) {
			if (d.properties[field] !== 0) {
				return d.properties.name + ": " + d.properties[field] + " cents"
			} else {
				return d.properties.name + ": No Data"
			}
	  })
	map4.call(tip);
	var hex = map4.selectAll(".hex")
		.data(data)
		.enter()
		.append("path")
		.attr("class", function(d){
			return "hex " + d.properties.name;
		})
		.attr("d", path2)
		.style("fill", function(d){
			var value = d.properties[field];
			return colorscale(value);
		})
		.on('mouseover.t', tip.show)
		.on('mouseover', function(d){
	    var selected = map4.selectAll(".hex" + "." + d.properties.name)
        .style("opacity", 0.5);
		})
    .on('mouseout.t', tip.hide)
		.on('mouseout', function(d){
			var selected = map4.selectAll(".hex" + "." + d.properties.name)
        .style("opacity", 1);
		})
	// add hex name
  var hexname = map4.selectAll("hexname")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function(d){return path2.centroid(d)[0]})
    .attr("y", function(d){return path2.centroid(d)[1]})
    .text(function(d){ return d.properties.label2})
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .style("font-size", "14px")
    .style("fill", "white")
		.on('mouseover.t', tip.show)
		.on('mouseover', function(d){
	    var selected = map4.selectAll(".hex" + "." + d.properties.name)
        .style("opacity", 0.5);
		})
    .on('mouseout.t', tip.hide)
		.on('mouseout', function(d){
			var selected = map4.selectAll(".hex" + "." + d.properties.name)
        .style("opacity", 1);
		})
}
