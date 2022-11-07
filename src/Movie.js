
import {useRef,useState, useEffect} from 'react'
import * as d3 from 'd3'
import { motion } from "framer-motion"


export default function Movie(isVisible) {
    const ref = useRef();
    const [movie,setMovie] = useState([])
    useEffect(()=> {
        const loadPost = async () => {
            const response = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
            const movies = await response.json();
            setMovie(movies)
        }
        loadPost()
        const svgElement = d3.select(ref.current);
        svgElement.attr('class', 'element');
        const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
        var margin = {top: 50, right: 10, bottom: 10, left: 10},
        width = 1500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        color = d3.scaleOrdinal()
        .range(['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69']);
        ;

        var treemap = d3.treemap().size([width, height]);
        var div = d3.select(".movies").append("div")
        .attr('class', 'new')
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", 50+margin.left + "px")
        .style("top", 120+margin.top + "px");
        var root = d3.hierarchy(movie,  (d) => d.children)
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
          .style('color', 'black')
          .on('mouseenter', function(d,event){
            d3.select(this)
            .style('z-index', 1)
            .style('border', 'solid 2px gray')
            .style('box-shadow', '1px 1px 5px 1px white')
            .style("width", (d) => Math.max(0, event.x1 - event.x0)+10 + "px")
            .style("height", (d) => Math.max(0, event.y1 - event.y0)+10 + "px") 
              tooltip.style('opacity',1);
              tooltip.html(`Name: ${event.data.name}<br>Genre:  ${event.data.category}<br>Sales: $${(event.data.value/1000000).toFixed(2)} Million USD`)
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
           
    
        
            const newRoot =  d3.hierarchy(movie, (d) => d.children)
            .sum(value);
    
    
            node.data(treemap(newRoot).leaves())
              .transition()
                .duration(1500)
                .style("left", (d) => d.x0 + "px")
                .style("top", (d) => d.y0 + "px")
                .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
                .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
          });
          svgElement.append('rect').attr('x',1000).attr('y',-10).attr('width',20).attr('height',20).style('fill','#8dd3c7')
          svgElement.append('text').attr('x',1025).attr('y',0).text('Action').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',20).attr('width',20).attr('height',20).style('fill','#ffffb3')
          svgElement.append('text').attr('x',1025).attr('y',30).text('Drama').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',50).attr('width',20).attr('height',20).style('fill','#bebada')
          svgElement.append('text').attr('x',1025).attr('y',60).text('Adventure').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',80).attr('width',20).attr('height',20).style('fill','#fb8072')
          svgElement.append('text').attr('x',1025).attr('y',90).text('Family').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',110).attr('width',20).attr('height',20).style('fill','#80b1d3')
          svgElement.append('text').attr('x',1025).attr('y',120).text('Animation').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',140).attr('width',20).attr('height',20).style('fill','#fdb462')
          svgElement.append('text').attr('x',1025).attr('y',150).text('Comedy').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          svgElement.append('rect').attr('x',1000).attr('y',170).attr('width',20).attr('height',20).style('fill','#b3de69')
          svgElement.append('text').attr('x',1025).attr('y',180).text('Biography').style('font-size','7.5px').attr('alignment-baseline','middle').attr('fill','gray')
    
          // eslint-disable-next-line 
    },[movie.length])
    return (
      <motion.div   
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}>
                <div className="movies">
        <h3 className='header'>Movie Sales</h3>
        <h5 className='subtitle'>Top 100 Highest Grossing Movies (Grouped By Genre)</h5>
        <form>
    <label><input type="radio" name="mode" defaultChecked value="size"/>Value</label>
    <label><input type="radio" name="mode" value="count"/> Count</label>
  </form>
  <svg ref={ref} 
      viewBox='-250 -100 1400 800'>
      </svg>
      </div>
      </motion.div>
    )
}