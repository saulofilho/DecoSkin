jQuery(document).ready(function($) {
  "use strict";

  var userFeed = new Instafeed({
    get: "user",
    userId: "194830405",
    limit: 9,
    accessToken: "194830405.1677ed0.c3fc68bc3890455994b89d209021ae0b",
    resolution: "standard_resolution",
    target: "instafeed",
    template:
      '<div class="insta-img-container"><a class="insta-link" href="{{link}}" target="_blank" title="{{caption}}"><img class="insta-img" src="{{image}}"/></a></div>'
  });
  userFeed.run();
});

$(document).ready(function() {
  $(".count").text($(".vtexsc-skuQtt").html());
});
$(document).ready(function() {
  $(".badge").text($(".vtexsc-skuQtt").html());
});
