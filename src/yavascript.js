var svg = d3.select("svg")
var body = d3.select("body")

var rect = svg.append("rect")
.attr({
  width:'100%',
  height: '100%'
});

var gradient = svg.append('defs')
  .append('linearGradient')
  .attr({
    'id': 'gradient',
    'x1': '0%',
    'y1': '0%',
    'x2': '100%',
    'y2': '100%',
    'spreadMethod': 'pad'
  });

var stops = gradient.selectAll('stop')
  .data([
    {offset: '0%', color: 0},
    {offset: '40%', color: 20},
    {offset: '60%', color: 20},
    {offset: '100%', color: 40}
  ]);

stops.enter().append('stop')
  .attr('offset', function(d) { return d.offset; })
  .attr('stop-color', function(d) { return d3.hsl(d.color,0.8,0.6).toString(); });

rect.style('fill', 'url(#gradient)');

var header = svg.append("text")
  .attr({
    'font-family': 'sans-serif',
    'font-size': '100',
    'y': 130,
    'x': 60,
    'fill':'transparent',
    'stroke': '#fff',
    'class':'svg-copy'
  }).text('Julia Allyce');

var title = svg.append('text')
  .attr({
    'font-family': 'sans-serif',
    'font-size': '1.2em',
    'y': 160,
    'x': 60,
    'fill':'transparent',
    'stroke': '#fff',
    'class':'svg-copy'
  }).text('Front End Developer');

//MEDIUM
var mediumLink = svg.append('svg:a').attr({
  'xlink:href': 'http://medium.com/@juliaallyce'})
.append('text').attr({
  'font-family': 'icomoon',
  'font-size': '1.2em',
  'y': 190,
  'x': 60,
  'fill':'#fff',
  'class':'svg-copy'
}).html('&#xe900;');

//TWITTER
var twitterLink = svg.append('svg:a').attr({
  'xlink:href': 'http://twitter.com/julia_allyce'})
.append('text').attr({
  'font-family': 'icomoon',
  'font-size': '1.2em',
  'y': 190,
  'x': 90,
  'fill':'#fff',
  'class':'svg-copy'
}).html('&#xe904;');


//GITHUB
var githubLink = svg.append('svg:a').attr({
  'xlink:href': 'http://github.com/julia-allyce'})
.append('text').attr({
  'font-family': 'icomoon',
  'font-size': '1.2em',
  'y': 190,
  'x': 120,
  'fill':'#fff',
  'class':'svg-copy'
}).html('&#xe905;');
    
var svgCopy = svg.selectAll('.svg-copy');

var mouseHandler = debounce(function(){
  stops.attr('stop-color', function(d) { 
        var h = d.color + 1;
    h = h > 360 ? h-360 : h;
    d.color=h;
        return d3.hsl(h,1,0.6).toString(); 
      });
  rect.transition().style('fill', 'url(#gradient)');
},10);

var scrollHandler = function() {
  var st = (window.scrollY + 0.5) << 0;
  var opacity = st > 200 ? 0 : (200 - st)/200;
  svgCopy.style('opacity', opacity);
};

body.on('mousemove', mouseHandler);
body.on('touchmove', mouseHandler);
d3.select(window).on('scroll', scrollHandler);

scrollHandler();

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var evt  = d3.event;

    var later = function() {
      timeout = null;
      if (!immediate) {
        var tmpEvent = d3.event;
        d3.event = evt;
        func.apply(context, args);
        d3.event = tmpEvent;
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      var tmpEvent = d3.event;
      d3.event = evt;
      func.apply(context, args);
      d3.event = tmpEvent;
    }

  };
}