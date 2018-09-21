import { Navbar, Home, Videos, Team, News, Photos } from "./components.js";
import { defaultRoute } from "./config.js";
import { setView } from "./modules/utils.js";

window.addEventListener("load", function() {
	const navbarNode = document.getElementById("navbar");
	const containerNode = document.getElementById("container");

	m.render(navbarNode, m(Navbar));

	m.route(containerNode, 
		defaultRoute, 
		{
			"/accueil": Home, 
			"/videos": Videos, 
			"/equipe": Team, 
			"/actualites": News, 
			"/photos": Photos 
		});

	setView(location.hash);

	window.addEventListener("hashchange", () => setView(location.hash));

	/*if ('serviceWorker' in navigator) {
	    navigator.serviceWorker
	             .register('./service-worker.js')
	             .then(function() { console.log('[Service Worker] Service Worker Registered'); });*/
  }
});
