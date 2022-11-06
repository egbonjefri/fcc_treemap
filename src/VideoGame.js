
import {useRef,useState, useEffect} from 'react'
import * as d3 from 'd3'


export default function VideoGame() {
    const ref = useRef();
    const [games,setGames] = useState([])
    useEffect(()=> {
        const loadPost = async () => {
            const response = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json');
            const games = await response.json();
            setGames(games)
        }
        loadPost()
        const svgElement = d3.select(ref.current);
        svgElement.attr('class', 'element');
        const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
        var margin = {top: 50, right: 10, bottom: 10, left: 10},
        width = 1500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        color = d3.scaleOrdinal()
    .range(["#54464A", "#2B3454", "#4D0054", "#540D27", "#005422", "#3DBAB3", "#BA7D7D", "#2013BA", "#6B7BB3", "#B37D00", "#000D3B","#002D38","#1F0000", "#13001F", "#575757", "#3E4057","#F00000", '#FF5C5C', '#070808']);

        var treemap = d3.treemap().size([width, height]);
        var div = d3.select(".games").append("div")
        .attr('class', 'new')
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", 50+margin.left + "px")
        .style("top", 120+margin.top + "px");
        var root = d3.hierarchy(games,  (d) => d.children)
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
          .style('font', '10px')
          .style('color', 'white')
          .on('mouseenter', function(d,event){
            d3.select(this)
            .style('z-index', 1)
            .style('border', 'solid 2px gray')
            .style('box-shadow', '1px 1px 5px 1px white')
            .style("width", (d) => Math.max(0, event.x1 - event.x0)+10 + "px")
            .style("height", (d) => Math.max(0, event.y1 - event.y0)+10 + "px") 
              tooltip.style('opacity',1);
              tooltip.html(`Name: ${event.data.name}<br>Platform:  ${event.data.category}<br>Sales: $${event.data.value} Million USD`)
              tooltip.style('left', ((d.pageX)-180)+'px')
              tooltip.style('top', ((d.pageY)-75)+'px')
              .style('z-index', 1)
            })
          .on('mouseleave', function(d,event){
            d3.select(this)
            .style("width", (d) => Math.max(0, event.x1 - event.x0) + "px")
            .style("height", (d) => Math.max(0, event.y1 - event.y0) + "px")
            .style('z-index', 0)
            .style('border', 'solid 1px #1b1b1b') 
            .style('box-shadow', 'none')
            tooltip.style('opacity', 0) 
          });
          d3.selectAll("input").on("change", function change() {
            const value = this.value === "count"
            ? (d) => { return d.value ? 1 : 0;}
            : (d) => { return d.value; };
           
    
        
            const newRoot =  d3.hierarchy(games, (d) => d.children)
            .sum(value);
    
    
            node.data(treemap(newRoot).leaves())
              .transition()
                .duration(1500)
                .style("left", (d) => d.x0 + "px")
                .style("top", (d) => d.y0 + "px")
                .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
                .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
          });
          svgElement.append('rect').attr('x',1000).attr('y',-70).attr('width',20).attr('height',20).style('fill','#54464A')
          svgElement.append('text').attr('x',1025).attr('y',-60).text('2600').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',-40).attr('width',20).attr('height',20).style('fill','#2B3454')
          svgElement.append('text').attr('x',1025).attr('y',-30).text('Wii').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',-10).attr('width',20).attr('height',20).style('fill','#4D0054')
          svgElement.append('text').attr('x',1025).attr('y',0).text('NES').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',20).attr('width',20).attr('height',20).style('fill','#540D27')
          svgElement.append('text').attr('x',1025).attr('y',30).text('GB').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',50).attr('width',20).attr('height',20).style('fill','#005422')
          svgElement.append('text').attr('x',1025).attr('y',60).text('DS').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',80).attr('width',20).attr('height',20).style('fill','#3DBAB3')
          svgElement.append('text').attr('x',1025).attr('y',90).text('X360').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',110).attr('width',20).attr('height',20).style('fill','#BA7D7D')
          svgElement.append('text').attr('x',1025).attr('y',120).text('PS3').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',140).attr('width',20).attr('height',20).style('fill','#2013BA')
          svgElement.append('text').attr('x',1025).attr('y',150).text('PS2').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',170).attr('width',20).attr('height',20).style('fill','#6B7BB3')
          svgElement.append('text').attr('x',1025).attr('y',180).text('SNES').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',200).attr('width',20).attr('height',20).style('fill','#B37D00')
          svgElement.append('text').attr('x',1025).attr('y',210).text('GBA').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',230).attr('width',20).attr('height',20).style('fill','#000D3B')
          svgElement.append('text').attr('x',1025).attr('y',240).text('PS4').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',260).attr('width',20).attr('height',20).style('fill','#002D38')
          svgElement.append('text').attr('x',1025).attr('y',270).text('3DS').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',290).attr('width',20).attr('height',20).style('fill','#1F0000')
          svgElement.append('text').attr('x',1025).attr('y',300).text('N64').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',320).attr('width',20).attr('height',20).style('fill','#13001F')
          svgElement.append('text').attr('x',1025).attr('y',330).text('PS').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',350).attr('width',20).attr('height',20).style('fill','#575757')
          svgElement.append('text').attr('x',1025).attr('y',360).text('XB').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',380).attr('width',20).attr('height',20).style('fill','#3E4057')
          svgElement.append('text').attr('x',1025).attr('y',390).text('PC').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',410).attr('width',20).attr('height',20).style('fill','#F00000')
          svgElement.append('text').attr('x',1025).attr('y',420).text('PSP').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',440).attr('width',20).attr('height',20).style('fill','#FF5C5C')
          svgElement.append('text').attr('x',1025).attr('y',450).text('XOne').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
         
          // eslint-disable-next-line 
    },[games.length])









    return (
        <div className="games">
        <h3 className='header'>Video Game Sales</h3>
        <h5 className='subtitle'>Top 100 Most Sold Video Games (Grouped By Platform)</h5>
        <form>
    <label><input type="radio" name="mode" defaultChecked value="size"/>Value</label>
    <label><input type="radio" name="mode" value="count"/> Count</label>
  </form>
  <svg ref={ref} 
      viewBox='-250 -100 1400 800'>
      </svg>
      </div>
    )
}