jQuery(document).ready(function($) {
	"use strict";

	var userFeed = new Instafeed({
		get: 'user',
		userId: '194830405',
		limit: 9,
		accessToken: '194830405.1677ed0.d26a030b52a14b57bf1f8489b109fb34',
		resolution: 'standard_resolution',
		target: 'instafeed',
		template: '<div class="insta-img-container"><a class="insta-link" href="{{link}}" target="_blank" title="{{caption}}"><img class="insta-img" src="{{image}}"/></a></div>'
	});
	userFeed.run();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log(`Service Worker registered! Scope: ${registration.scope}`);
        })
        .catch(err => {
          console.log(`Service Worker registration failed: ${err}`);
        });
    });
  }