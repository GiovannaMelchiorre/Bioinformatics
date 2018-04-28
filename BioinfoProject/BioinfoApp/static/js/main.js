 $(document).ready(function(){
  create_graph();
});

function create_graph(){
    var lay = getOption();
    var lay_option = getLayout(lay);  
    var lay_option_name=lay_option.name;    

    var cy = cytoscape({
      container: document.getElementById('cy'),

      layout: {
          name: lay_option_name
      },

      elements: {"nodes":[],"edges":[] },
      style: [
          {
              selector: "node",
              css: {
              
                  "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                  "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                  "content": "data(name)",
                  "font-size": "12px",
                  "text-valign": "center",
                  "text-halign": "center",
                  "background-color": "#555",
                  "text-outline-color": "#555",
                  "text-outline-width": "2px",
                  "color": "#fff",
                  "overlay-padding": "6px",
                  "z-index": "10"
              }
          },
        
           {
                selector: "node:selected",
                style: {
                  "border-width": "6px",
                  "border-color": "#AAD8FF",
                  "border-opacity": "0.5",
                  "background-color": "#77828C",
                  "text-outline-color": "#77828C"
                }
              }, 

         
           {
                selector: "edge",
                style: {
                  "curve-style": "haystack",
                  "haystack-radius": "0.5",
                  "opacity": "0.4",
                  "line-color": "#bbb",
                  "width": "mapData(weight, 0, 1, 1, 8)",
                  "overlay-padding": "3px"
                }
              }, 
              {
              selector: "edge:selected",
                style: {               
                  "opacity": "1",
                  "line-color": "#8bb0d0",
                  "overlay-padding": "6px"
                }
              }, 


          {
            selector: 'core',
            css: {
              "selection-box-color": "#AAD8FF",
              "selection-box-border-color": "#8BB0D0",
              "selection-box-opacity": "0.5"
            }
          }
        
      ]
  });
          

  var graphElements =cytoscape_graph;
  cy.add(graphElements);
  cy.layout(lay_option); 
    
};


 function getOption() {
    var obj = document.getElementById("selector");
    var option = obj.options[obj.selectedIndex].text;
    return option;
}

function getLayout(lay){
  if(lay == "circle"){
      var options = {
        name: 'circle',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        radius: undefined, // the radius of the circle
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      };
      } else if(lay=="concentric"){
      var options = {
        name: 'concentric',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined, // height of layout area (overrides container height)
        width: undefined, // width of layout area (overrides container width)
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
        },
        levelWidth: function( nodes ){ // the variation of concentric values in each level
        return nodes.maxDegree() / 4;
        },
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      };
      }else if(lay=="breadthfirst"){
      var options = {
        name: 'breadthfirst',
        fit: true, // whether to fit the viewport to the graph
        directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
        padding: 30, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        roots: undefined, // the roots of the trees
        maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      };
      }else if(lay=="grid"){
      var options = {
        name: 'grid',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // padding used on fit
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false, // uses all available space on false, uses minimal space on true
        rows: undefined, // force num of rows in the grid
        cols: undefined, // force num of columns in the grid
        position: function( node ){}, // returns { row, col } for element
        sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      };
      };
      return options;

}