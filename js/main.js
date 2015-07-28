;(function() {
var $body    = $('body');
var $main    = $('.main');
var $src     = $('#src');
var $diagram = $('#diagram');

function render(ev) {
  try {
    var previousSvg = $diagram.html();
    $diagram.html('');

    var diagram = Diagram.parse($src.val());
    diagram.drawSVG('diagram', {theme: 'simple'});

    $.fn.matchHeight._update()
  } catch (err) {
    $diagram.html(previousSvg);
  }
}

function savePng(ev) {
  var $svg = $diagram.find('svg');
  $svg.find('rect').attr('fill', '#fff');

  var width = $svg.width()
  var height = $svg.height()
  $canvas = $('<canvas id="t2s2p-canvas" width='+ width + ' height=' + height +'/>');
  $body.append($canvas.hide());
  var ctx = $canvas[0].getContext('2d');

  $svg.attr('viewBox', '0 0 ' + width + ' ' + height);
  var svgData = new XMLSerializer().serializeToString($svg[0]);
  var imgsrc  = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)));

  var image   = new Image();
  image.onload = function() {
    ctx.drawImage(image, 0, 0);

    var $a = $('<a id="t2s2p-a" type="application/octet-stream" href="'+ $canvas[0].toDataURL('image/png') + '" download="seq.png">_</a>');
    $body.append($a);
    $a[0].click();

    $canvas.remove();
    $a.remove();
  };
  image.src = imgsrc;
}

$main.matchHeight({property: 'height'});
$src.on('input', render);
render();

autosize($src);

$('#save-png').on('click', savePng);
$('#save-pdf').on('click', function(ev) { print(); });
})();
