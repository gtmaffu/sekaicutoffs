var y, yAxis, svg, tooltip;

d3.csv("cutoffs.csv").then(function (csv) {
    for (var i = 0; i < csv.length; ++i) {
        var eventId = csv[i]["Event ID"];
        var eventName = csv[i]["Event Name"];
        var focusUnit = csv[i]["Focus Unit"];
        var t1 = csv[i]["T1"];
        var t10 = csv[i]["T10"];
        var t20 = csv[i]["T20"];
        var t30 = csv[i]["T30"];
        var t40 = csv[i]["T40"];
        var t50 = csv[i]["T50"];
        var t100 = csv[i]["T100"];
        var t200 = csv[i]["T200"];
        var t300 = csv[i]["T300"];
        var t400 = csv[i]["T400"];
        var t500 = csv[i]["T500"];
        var t1000 = csv[i]["T1000"];
    }
}).catch(function (error) {
    console.error("Error loading CSV file:", error);
});

d3.csv("cutoffs.csv").then(function (data) {
    // Parse the data
    data.forEach(function (d) {
        d["T1"] = +d["T1"].replace(/,/g, '');
        d["T10"] = +d["T10"].replace(/,/g, '');
        d["T20"] = +d["T20"].replace(/,/g, '');
        d["T30"] = +d["T30"].replace(/,/g, '');
        d["T40"] = +d["T40"].replace(/,/g, '');
        d["T50"] = +d["T50"].replace(/,/g, '');
        d["T100"] = +d["T100"].replace(/,/g, '');
        d["T200"] = +d["T200"].replace(/,/g, '');
        d["T300"] = +d["T300"].replace(/,/g, '');
        d["T400"] = +d["T400"].replace(/,/g, '');
        d["T500"] = +d["T500"].replace(/,/g, '');
        d["T1000"] = +d["T1000"].replace(/,/g, '');
    });

    var margin = { top: 20, right: 30, bottom: 100, left: 90 },
        width = 900 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Order x axis but unit
    var focusUnitOrder = [
        "Hatsune Miku",
        "Ichika Hoshino",
        "Saki Tenma",
        "Honami Mochizuki",
        "Shiho Hinomori",
        "Minori Hanasato",
        "Haruka Kiritani",
        "Airi Momoi",
        "Shizuku Hinomori",
        "Kohane Azusawa",
        "An Shiraishi",
        "Akito Shinonome",
        "Toya Aoyagi",
        "Tsukasa Tenma",
        "Emu Otori",
        "Nene Kusanagi",
        "Rui Kamishiro",
        "Kanade Yoisaki",
        "Mafuyu Asahina",
        "Ena Shinonome",
        "Mizuki Akiyama"
    ];

    // Character color mapping
    var colorMapping = {
        "Hatsune Miku": "#33CCBA",
        "Ichika Hoshino": "#33AAEE",
        "Saki Tenma": "#FFDD45",
        "Honami Mochizuki": "#EE6666",
        "Shiho Hinomori": "#BBDE22",
        "Minori Hanasato": "#FFCDAC",
        "Haruka Kiritani": "#99CDFF",
        "Airi Momoi": "#FFA9CC",
        "Shizuku Hinomori": "#9AEEDE",
        "Kohane Azusawa": "#FF679A",
        "An Shiraishi": "#00BBDC",
        "Akito Shinonome": "#FF7721",
        "Toya Aoyagi": "#0077DD",
        "Tsukasa Tenma": "#FFBB00",
        "Emu Otori": "#FF66BC",
        "Nene Kusanagi": "#34DD9A",
        "Rui Kamishiro": "#BB88ED",
        "Kanade Yoisaki": "#BB6588",
        "Mafuyu Asahina": "#8889CC",
        "Ena Shinonome": "#CCAA87",
        "Mizuki Akiyama": "#E4A8CA"
    };

    // X axis
    var x = d3.scalePoint()
        .domain(focusUnitOrder)
        .range([20, width]); // Added padding to the range

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    y = d3.scaleLinear()
        .range([height, 0]);

    yAxis = svg.append("g")
        .attr("class", "y axis");

    // Event tooltip
    tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("display", "none");

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d["Focus Unit"]); })
        .attr("cy", function (d) { return y(d["T100"]); })
        .attr("r", 5)
        .style("fill", function (d) { return colorMapping[d["Focus Unit"]]; })
        .style("stroke", "black")
        .style("stroke-width", 1)
        .on("mouseover", function (event, d) {
            tooltip.style("display", "block");
            tooltip.html("Focus Unit: " + d["Focus Unit"] + "<br>" +
                "Event ID: " + d["Event ID"] + "<br>" +
                "Event Name: " + d["Event Name"] + "<br>" +
                "T100: " + d["T100"])
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
        });

    // X axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 70)
        .text("Focus Unit");

    // Y axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -height / 2 + margin.top)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .text("T100");

    var dropdown = d3.select("body").append("select")
        .attr("id", "valueSelect")
        .on("change", function () {
            updateChart(data);
        });

    dropdown.selectAll("option")
        .data(["T1", "T10", "T20", "T30", "T40", "T50", "T100", "T200", "T300", "T400", "T500", "T1000"])
        .enter()
        .append("option")
        .text(function (d) { return d; })
        .attr("value", function (d) { return d; });

    updateChart(data);
}).catch(function (error) {
    console.error("Error loading CSV file:", error);
});

function updateChart(data) {
    var selectedValue = d3.select("#valueSelect").property("value");

    // Update Y axis domain
    y.domain([0, d3.max(data, function (d) { return d[selectedValue]; })]);
    yAxis.call(d3.axisLeft(y));

    // Update dots
    svg.selectAll("circle")
        .attr("cy", function (d) { return y(d[selectedValue]); });

    // Update tooltip
    svg.selectAll("circle")
        .on("mouseover", function (event, d) {
            tooltip.style("display", "block");
            tooltip.html("Focus Unit: " + d["Focus Unit"] + "<br>" +
                "Event ID: " + d["Event ID"] + "<br>" +
                "Event Name: " + d["Event Name"] + "<br>" +
                selectedValue + ": " + d[selectedValue])
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        });
}
