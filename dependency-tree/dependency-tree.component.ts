import { Component, OnInit, Inject } from '@angular/core';
import * as d3           from 'd3';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dependency-tree',
  templateUrl: './dependency-tree.component.html',
  styleUrls: ['./dependency-tree.component.css']
})
export class DependencyTreeComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DependencyTreeComponent>, @Inject(MD_DIALOG_DATA) public data: AppInterfaces.ITreeNode) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadDependencyTreeGraph();
  }

  private loadDependencyTreeGraph(): void {
    var treeData;

    // Set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 1080 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    document.getElementById("dependencyTree").innerHTML = '';
    var svg = d3.select("#dependencyTree").append("svg")
      .attr("preserveAspectRatio","xMinYMin meet")
      .attr("viewBox","0 0 " + (width + margin.right + margin.left) + " " + (height + margin.top + margin.bottom));
    var view = svg.append("g")
      .attr("transform", "translate("
        + margin.left + "," + margin.top + ")");

    var i = 0,
    duration = 750,
    root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    let hie = function(d) { return d.children; };
    // Assigns parent, children, height, depth
    root = d3.hierarchy(this.data, hie);
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    //root.children.forEach(collapse);

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update(source) {

      // Assigns the x and y position for the nodes
      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function(d){ d.y = d.depth * 180});

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = view.selectAll('g.node')
        .data(nodes, function(d) {return d['id'] || (d['id'] = ++i); });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d['_children'] ? "lightsteelblue" : "#fff";
        });

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d['_children'] ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d['_children'] ? "end" : "start";
        })
        .text(function(d) { return d.data['name']; });

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")";
      });

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d) {
          return d['_children'] ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');


      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
      .attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text')
      .style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = view.selectAll('path.link')
        .data(links, function(d) { return d['id']; });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

      // Remove any exiting links
      var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d){
        d['x0'] = d.x;
        d['y0'] = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`

        return path;
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }


    var path = d3.geoPath().projection(null);


    var zoom = d3.zoom()
      .scaleExtent([1, 40])
      .translateExtent([[-100, -100],[width+margin.left+margin.right, height+margin.top+margin.bottom]])
      .on("zoom", zoomed);

      var transform = zoomBounds();

    svg.call(zoom);
    
    function zoomed() {
      view.attr("transform", d3.event.transform);
    }

    svg.call(zoom);

    function zoomBounds() {
        // // Calculate dimensions of bounds
        // // and scale to fit inside container
        // var width = bounds[1][0] - bounds[0][0],
        //     height = bounds[1][1] - bounds[0][1],
        //     scale = 1 / Math.max(width / size[0], height / size[1]);

        // // Calculate center of bounds
        // // and difference from center of container
        // var x = (bounds[0][0] + bounds[1][0]) / 2,
        //     y = (bounds[0][1] + bounds[1][1]) / 2,
        //     translate = [size[0] / 2 - scale * x, size[1] / 2 - scale * y];

        return d3.zoomIdentity
            .translate(540, 200)
            .scale(0.1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
