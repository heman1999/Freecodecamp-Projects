const url =
  "https://api.covid19api.com/country/india?from=2020-04-20T00:00:00Z&to=2020-09-20T00:00:00Z";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

fetchData(url).then((data) => {
  const confirmedCases = data.map((val) => {
    return { date: new Date(val.Date), cases: val.Confirmed };
  });

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const width = 850;
  const height = 500;
  const margin = { top: 60, right: 20, bottom: 20, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const formatTime = d3.timeFormat("%b %d, %Y");

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const mouseOverHandler = function (d, i) {
    d3.select(this).transition().duration("50").attr("opacity", ".5");
    const cases = d3.select(this).attr("data-gdp");
    const date = d3.select(this).attr("data-date");
    tooltip.transition().duration("100").style("opacity", ".8");
    tooltip
      .html(date + "<br>" + cases)
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + 20 + "px");
  };
  const mouseOutHandler = function (d, i) {
    d3.select(this).transition().duration("50").attr("opacity", "1");
    tooltip.transition().duration("100").style("opacity", "0");
  };

  const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = d3
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("text")
    .attr("x", innerWidth / 2)
    .attr("y", 10 - margin.top / 2)
    .attr("text-anchor", "middle")
    .attr("id", "title")
    .text("India Covid Confirmed Cases");

  const xScale = d3
    .scaleTime()
    .domain([
      confirmedCases[0].date,
      confirmedCases[confirmedCases.length - 1].date.addDays(1),
    ])
    .range([0, innerWidth + 10]);

  const xAxis = d3.axisBottom(xScale);
  g.append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`)
    .attr("id", "x-axis");

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(confirmedCases, (d) => d.cases),
      d3.max(confirmedCases, (d) => d.cases),
    ])
    .range([innerHeight, 0])
    .nice();

  const yAxis = d3.axisLeft(yScale);
  g.append("g").call(yAxis).attr("id", "y-axis");

  g.selectAll("rect")
    .data(confirmedCases)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.date))
    .attr("y", (d) => yScale(d.cases))
    .attr("height", (d) => innerHeight - yScale(d.cases))
    .attr("width", innerWidth / confirmedCases.length)
    .attr("data-date", (d) => formatTime(d.date))
    .attr("data-gdp", (d) => d.cases)
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler);
});
