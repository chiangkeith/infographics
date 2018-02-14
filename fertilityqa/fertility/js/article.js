$(document).ready(function () {

  let $marker = $(".marker");

  $(".menuTrigger").click(function () {

    $marker.toggleClass("active");

  });

  const layoutDone = new Event('layoutDone') 
  window.dispatchEvent(layoutDone) 

});