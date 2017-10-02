import { Component,
         OnInit }     from '@angular/core';
import * as d3        from 'd3';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public jsonData = <AppInterfaces.ITreeNode>{
    name: 'Catalog',
    isVisible: true,
    children: <Array<AppInterfaces.ITreeNode>>[
      <AppInterfaces.ITreeNode>{
        name: 'Group 1',
        isVisible: true,
        children: <Array<AppInterfaces.ITreeNode>>[
          <AppInterfaces.ITreeNode>{
            name: 'Category 1',
            isVisible: true,
            children: <Array<AppInterfaces.ITreeNode>>[
              <AppInterfaces.ITreeNode>{
                name: 'Class 1',
                isVisible: true,
                children: <Array<AppInterfaces.ITreeNode>>[
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 1',
                    isVisible: true,
                    children: <Array<AppInterfaces.ITreeNode>>[
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 1',
                        isVisible: true,
                        children: []
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 2',
                        isVisible: true,
                        children: []
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 3',
                        isVisible: true,
                        children: []
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 4',
                        isVisible: true,
                        children: []
                      }
                    ]
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 2',
                    isVisible: true,
                    children: []
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 3',
                    isVisible: true,
                    children: []
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 4',
                    isVisible: true,
                    children: []
                  }
                ]
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 2',
                isVisible: true,
                children: []
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 3',
                isVisible: true,
                children: []
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 4',
                isVisible: true,
                children: []
              }
            ]
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 2',
            isVisible: true,
            children: []
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 3',
            isVisible: true,
            children: []
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 4',
            isVisible: true,
            children: []
          }
        ]
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 2',
        isVisible: true,
        children: []
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 3',
        isVisible: true,
        children: []
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 4',
        isVisible: true,
        children: []
      }
    ]
  };

  public constructor() { }

  public ngOnInit(): void {
  }

  private loadDependencyTreeGraph(): void {
    var treeData;
    
    // Set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    document.getElementById("dependencyTree").innerHTML = '';
    var svg = d3.select("#dependencyTree").append("svg")
        // .attr("width", width + margin.right + margin.left)
        .attr("width", '100%')
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate("
              + margin.left + "," + margin.top + ")");
    
    var i = 0,
        duration = 750,
        root;
    
    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);
    
    let hie = function(d) { return d.children; };
    // Assigns parent, children, height, depth
    root = d3.hierarchy(this.jsonData, hie);
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
      var node = svg.selectAll('g.node')
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
      var link = svg.selectAll('path.link')
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
    
        return path
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
  }
}
