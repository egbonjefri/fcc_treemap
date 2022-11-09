import {useRef,useEffect} from 'react'
import kickStarter from './kickStarter'
import * as d3 from 'd3'
function Kick() {
  const ref = useRef()



  useEffect(()=> {
    const svgElement = d3.select(ref.current);
    svgElement.attr('class', 'element');
    const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
    var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = window.innerWidth - margin.left - margin.right-(window.innerWidth/4),
    height = window.innerHeight - margin.top - margin.bottom -(window.innerHeight/5),
    color = d3.scaleOrdinal()
    .range(["#54464A", "#2B3454", "#4D0054", "#540D27", "#005422", "#3DBAB3", "#BA7D7D", "#2013BA", "#6B7BB3", "#B37D00", "#000D3B","#002D38","#1F0000", "#13001F", "#575757", "#3E4057","#F00000", '#FF5C5C', '#070808']);
    var treemap = d3.treemap().size([width,height])
    var div = d3.select(".body").append("div")
    .attr('class', 'new')
    .style("width", (width + margin.left + margin.right)+ "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", 120+margin.top + "px");
    var root = d3.hierarchy(kickStarter.kickStarter, (d) => d.children)
    .sum((d) => d.value);

  var tree = treemap(root);
  var node = div.datum(root).selectAll(".node")
      .data(tree.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", (d) => d.x0 + "px")
      .style("top", (d) => d.y0 + "px")
      .style("width", (d) => Math.max(0, d.x1 - d.x0) + "px")
      .style("height", (d) => Math.max(0, d.y1 - d.y0) + "px")
      .style('padding', '3px')
      .style("background", (d)=>color(d.data.category))
      .text((d) => d.data.name)
      .style('font-size', '10px')
      .on('mouseenter', function(d,event){
        d3.select(this)
        .style('z-index', 1)
        .style('border', 'solid 2px gray')
        .style('box-shadow', '1px 1px 5px 1px white')
        .style("width", (d) => Math.max(0, event.x1 - event.x0)+10 + "px")
        .style("height", (d) => Math.max(0, event.y1 - event.y0)+10 + "px") 
          tooltip.style('opacity',1);
          tooltip.html(`Name: ${event.data.name}<br>Category:  ${event.data.category}<br>Value: $${(event.data.value/1000000).toFixed(2)} Million USD`)
          tooltip.style('left', ((d.pageX)-120)+'px')
          tooltip.style('top', ((d.pageY)-35)+'px')
          .style('z-index', 1)
        })
      .on('mouseleave', function(d,event){
        d3.select(this)
        .style("width", (d) => Math.max(0, event.x1 - event.x0) + "px")
        .style("height", (d) => Math.max(0, event.y1 - event.y0) + "px")
        .style('box-shadow', 'none')
        .style('z-index', 0)
        .style('border', 'solid 1px #1b1b1b') 
        tooltip.style('opacity', 0) 
      });
      svgElement.append('rect').attr('x',1000).attr('y',-90).attr('width',20).attr('height',20).style('fill','#54464A')
      svgElement.append('text').attr('x',1025).attr('y',-80).text('Product Design').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',-60).attr('width',20).attr('height',20).style('fill','#2B3454')
      svgElement.append('text').attr('x',1025).attr('y',-50).text('Tabletop Games').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',-30).attr('width',20).attr('height',20).style('fill','#4D0054')
      svgElement.append('text').attr('x',1025).attr('y',-20).text('Gaming Hardware').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',0).attr('width',20).attr('height',20).style('fill','#540D27')
      svgElement.append('text').attr('x',1025).attr('y',10).text('Video Games').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',30).attr('width',20).attr('height',20).style('fill','#005422')
      svgElement.append('text').attr('x',1025).attr('y',40).text('Sound').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',60).attr('width',20).attr('height',20).style('fill','#3DBAB3')
      svgElement.append('text').attr('x',1025).attr('y',70).text('Television').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',90).attr('width',20).attr('height',20).style('fill','#BA7D7D')
      svgElement.append('text').attr('x',1025).attr('y',100).text('Narrative Film').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',120).attr('width',20).attr('height',20).style('fill','#2013BA')
      svgElement.append('text').attr('x',1025).attr('y',130).text('Web').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',150).attr('width',20).attr('height',20).style('fill','#6B7BB3')
      svgElement.append('text').attr('x',1025).attr('y',160).text('Hardware').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',180).attr('width',20).attr('height',20).style('fill','#B37D00')
      svgElement.append('text').attr('x',1025).attr('y',190).text('Games').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',210).attr('width',20).attr('height',20).style('fill','#000D3B')
      svgElement.append('text').attr('x',1025).attr('y',220).text('3D Printing').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',240).attr('width',20).attr('height',20).style('fill','#002D38')
      svgElement.append('text').attr('x',1025).attr('y',250).text('Wearables').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',270).attr('width',20).attr('height',20).style('fill','#1F0000')
      svgElement.append('text').attr('x',1025).attr('y',280).text('Technology').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',300).attr('width',20).attr('height',20).style('fill','#13001F')
      svgElement.append('text').attr('x',1025).attr('y',310).text('Sculpture').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',330).attr('width',20).attr('height',20).style('fill','#575757')
      svgElement.append('text').attr('x',1025).attr('y',340).text('Apparel').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',360).attr('width',20).attr('height',20).style('fill','#3E4057')
      svgElement.append('text').attr('x',1025).attr('y',370).text('Food').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',390).attr('width',20).attr('height',20).style('fill','#F00000')
      svgElement.append('text').attr('x',1025).attr('y',400).text('Art').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      svgElement.append('rect').attr('x',1000).attr('y',420).attr('width',20).attr('height',20).style('fill','#FF5C5C')
      svgElement.append('text').attr('x',1025).attr('y',430).text('Gadgets').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')
      svgElement.append('rect').attr('x',1000).attr('y',450).attr('width',20).attr('height',20).style('fill','#070808')
      svgElement.append('text').attr('x',1025).attr('y',460).text('Drinks').style('font-size','0.5rem').attr('alignment-baseline','middle').attr('fill','gray')

      d3.selectAll("input").on("change", function change() {
        const value = this.value === "count"
        ? (d) => { return d.value ? 1 : 0;}
        : (d) => { return d.value; };
       

    
        const newRoot =  d3.hierarchy(kickStarter.kickStarter, (d) => d.children)
        .sum(value);


        node.data(treemap(newRoot).leaves())
          .transition()
            .duration(1500)
            .style("left", (d) => d.x0 + "px")
            .style("top", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
      });

 
  },[])





  return (
    <div className="body">
      <h3 className='header'>Kickstarter Pledges</h3>
      <h5 className='subtitle'>Top 100 Most Pledged Kickstarter Campaigns (Grouped By Category)</h5>
      <form>
  <label><input type="radio" name="mode" defaultChecked value="size"/>Value</label>
  <label><input type="radio" name="mode" value="count"/> Count</label>
</form>
<svg ref={ref} 
    viewBox='-250 -100 1400 800'>
    </svg>
    </div>
  );
}

export default Kick;
