// Adicionar Instagram na home
$(function() {
  var configInstagram = {
    user: "decoskin",
    token: "194830405.1677ed0.c3fc68bc3890455994b89d209021ae0b",
    userid: "194830405"
  };

  var o =
    "<div class='container'><div class='instagram-title'><img class='logo-instagram' src='https://aesportiva.vteximg.com.br/arquivos/logo-instagram.png' alt='Instagram'><div class='text-title'>Siga nosso instagram <a href='https://instagram.com/" +
    configInstagram.user +
    "' target='blank' id='show-instagram'><strong>@" +
    configInstagram.user +
    "</strong></a></div></div><div class='instagram-images'><ul></ul></div></div>";

  $("#instagram-feed").append(o);
  var a = $("#instagram-feed ul");
  var e = configInstagram.token;
  var i = configInstagram.userid;
  $.ajax({
    url: "https://api.instagram.com/v1/users/" + i + "/media/recent",
    dataType: "jsonp",
    type: "GET",
    data: {
      access_token: e,
      count: 6
    },
    success: function(o) {
      for (var e = 0; e < o.data.length; e++)
        a.append(
          '<li class="image-item"><a href="' +
            o.data[e].link +
            '" target="_blank"><img class="insta-img" src="' +
            o.data[e].images.standard_resolution.url +
            '"/></li>'
        );
    },
    error: function(a) {
      $("#instagram-fiv").hide(), console.log(a);
    }
  });

  $(window).load(function() {
    if (($("#insta").append($(o)), $("#instagram-fiv").length)) {
      var a = $("#instagram-fiv ul");
      var e = configInstagram.token;
      var i = configInstagram.userid;
      $.ajax({
        url: "https://api.instagram.com/v1/users/" + i + "/media/recent",
        dataType: "jsonp",
        type: "GET",
        data: {
          access_token: e,
          count: 6
        },
        success: function(o) {
          for (var e = 0; e < o.data.length; e++)
            a.append(
              '<li><a href="' +
                o.data[e].link +
                '" target="_blank"><img src="' +
                o.data[e].images.standard_resolution.url +
                '"/></li>'
            );
        },
        error: function(a) {
          $("#instagram-fiv").hide(), console.log(a);
        }
      });
    }
    "sim" === configInstagram.ativo
      ? $("#instagram-fiv").show()
      : $("#instagram-fiv").hide();
  });

  if ("undefined" != typeof configInstagram) {
  }
});
