import { channelID, members, videosLinks } from "./config.js";

import E from "./modules/dom.js";
import { request, setView, loadTwitter } from "./modules/utils.js";

const Navbar = { view() {
	return m("nav", 
		{}, 
		m("ul", 
			{
				id: "nav"
			}, 
			m("li", 
				{
					id: "navbar__expander", 
					onclick() {
						document.querySelector("#navbar > nav > ul:first-of-type").classList.toggle("navbar__expanded");

						document.querySelector("#navbar > nav > ul:last-of-type").classList.remove("sidenav__expanded");
					}
				}), 
			m("li", 
				{
					onclick() {
						setView("#!/accueil");
					}, 
					"data-href": "/accueil"
				}, 
				"Accueil"), 
			m("li", 
				{
					onclick() {
						setView("#!/videos");
					}, 
					"data-href": "/videos"
				}, 
				"Vidéos"), 
			m("li", 
				{
					onclick() {
						setView("#!/equipe");
					}, 
					"data-href": "/equipe"
				}, 
				"Équipe"), 
			/*m("li", 
				{
					onclick() {
						setView("#!/actualites");
					}, 
					"data-href": "/actualites"
				}, 
				"Actualités"), */
			m("li", 
				{
					onclick() {
						setView("#!/photos");
					}, 
					"data-href": "/photos"
				}, 
				"Photos"), 
			/*m("li", 
				{
					id: "sidenav__expander"
				}, 
				m("img", 
					{
						src: "./ressources/icon.ico", 
						width: "25", 
						height: "25", 
						onclick() {
							document.querySelector("#navbar > nav > ul:last-of-type").classList.toggle("sidenav__expanded");
						}
					}))*/), 
		/*m("ul", 
			{
				id: "side"
			}, 
			m("li", 
				{}, 
				m("a", 
					{
						target: "_blank", 
						href: "https://www.instagram.com/studiopanart/"
					}, 
					"Instagram")), 
			m("li", 
				{}, 
				m("a", 
					{}, 
					"Facebook")), 
			m("li", 
				{}, 
				m("a", 
					{}, 
					"Twitter")), 
			m("li", 
				{}, 
				m("a", 
					{}, 
					"Youtube")))*/);
} }

const Home = { view() {
	loadTwitter();

	return m("main", 
		{
			id: "home"
		}, 
		m("img", 
			{
				src: "./ressources/banner.jpg", 
				id: "section__banner", 
				alt: "Bannière du Studio Panart"
			}), 
		m("section", 
			{
				id: "section__latest_youtube_video"
			}, 
			m("h3", 
				{}, 
				"Notre dernière vidéo"), 
			m(IframeLatestVideo), 
			m("br"), 
			m("a", 
				{
					href: "#!/videos"
				}, 
				"Voir toutes nos vidéos")), 
		m("section", 
			{
				id: "section__twitter_feed"
			}, 
			m(TwitterFeed, 
				{
					width: "300", 
					height: "500"
				})));
} }

const Videos = { view() {
	return m("main", 
		{
			id: "videos"
		}, 
		m(YoutubeVideos));
} }

const Team = { view() {
	return m("main", 
		{
			id: "team"
		}, 
		m(Members));
} }

const News = { view() {
	loadTwitter();

	return m("main", 
		{
			id: "news"
		}, 
		m(TwitterFeed, 
			{
				width: 1000
			}));
} }

const Photos = { view() {
	return m("main", 
		{
			id: "photos"
		}, 
		m(InstagramFeed));
} }

/* ---------- Minimal components ---------- */

const IframeLatestVideo = { view() {
	videosLinks(function(items) {
		const id = items[0].link.replace(/^.*=/g, "");
		let container;

		do {
			container = document.getElementById("latest_youtube_video");
		} while (container === null);

		container.src = "https://youtube.com/embed/" + id + "?rel=0";
		container.style.height = `${(container.clientWidth / 3) * 2}px`;
	});

	return m("iframe", 
		{
			id: "latest_youtube_video", 
			title: "La dernière vidéo publié par le Studio Panart sur Youtube", 
			frameborder: "0", 
			allowfullscreen: "1"
		});
} }

const YoutubeVideos = { view() {
	addVideos();

	return m("div", 
		{
			id: "youtube_videos"
		}, 
		m("div", 
			{
				class: "settings"
			}, 
			m("select", 
				{
					onchange() {
						addVideos();
					}, 
					"aria-label": "Sélection du mode d'affichage des vidéos"
				}, 
				m("option", 
					{
						value: "o2n", 
						selected: "1", 
						"aria-label": "Mode d'affichage de la plus récente à la plus ancienne"
					}, 
					"De la plus récente à la plus ancienne"), 
				m("option", 
					{
						value: "n20", 
						"aria-label": "Mode d'affichage de la plus ancienne à la plus récente"
					}, 
					"De la plus ancienne à la plus récente"))), 
		m("div", 
			{
				class: "list"
			}));

	function addVideos() {
		videosLinks(function(items) {
			switch (document.querySelector("select").selectedIndex) {
				case 1:
					items = items.reverse();
					break;
			}

			const ids = items.map(item => item.link.replace(/^.*=/g, ""));
			let container;
	
			do {
				container = document.querySelector("#youtube_videos div.list");
			} while (container === null);
	
			container.innerHTML = "";
	
			ids.forEach(id => {
				const element = document.createElement("iframe");
	
				element.setAttribute("frameborder", "0");
				element.setAttribute("allowfullscreen", "1");
				element.setAttribute("title", "Une vidéo du Studio Panart sur Youtube");
	
				element.src = "https://youtube.com/embed/" + id + "?rel=0";
				element.style.width = `${document.body.clientWidth * 0.6}px`;
				element.style.height = `${(element.style.width.replace(/[^0-9]/g, "") / 3) * 2}px`;
	
				container.appendChild(element);
			});
	
			try {
				container.src = "https://youtube.com/embed/" + id + "?rel=0";
			} catch (error) {}
			container.height = (container.clientWidth / 3) * 2;
		});
	}
} }

const TwitterFeed = { view(vnode) {
	return m("div", 
		{}, 
		m("a", 
			{
				href: "https://twitter.com/Studio_PanArt?ref_src=twsrc%5Etfw",
				class: "twitter-follow-button", 
				"data-show-count": "true", 
				"data-size": "large"
			}, 
			"Follow @Studio_PanArt"), 
		m("br"), 
		m("a", 
			{
				class: "twitter-timeline", 
				href: "https://twitter.com/Studio_PanArt?ref_src=twsrc%5Etfw", 
				"data-width": vnode.attrs.width || "", 
				"data-height": vnode.attrs.height || "", 
				"data-theme": "dark"
			}, 
			"Tweets by Studio_PanArt"));
} }

const Members = { view() {
	return m("div", 
		{
			id: "members"
		}, 
		...members.map(member => m(Member, member)), 
		m("fieldset", 
			{}, 
			m("legend", 
				{}, 
				"Pour nous joindre"), 
			m("ul", 
				{}, 
				m("li", 
					{}, 
					m("a", 
						{
							target: "_blank", 
							href: "https://www.instagram.com/studiopanart/"
						}, 
						"Instagram")), 
				m("li", 
					{}, 
					m("a", 
						{
							target: "_blank", 
							href: "https://www.facebook.com/panartstudio/"
						}, 
						"Facebook")), 
				m("li", 
					{}, 
					m("a", 
						{
							target: "_blank", 
							href: "https://twitter.com/Studio_PanArt"
						}, 
						"Twitter")), 
				m("li", 
					{}, 
					m("a", 
						{
							target: "_blank", 
							href: "https://www.youtube.com/channel/UC0cULmZZWpWpshTsyUHYiXQ"
						}, 
						"Youtube")))))
} }

const Member = { view(vnode) {
	return m("div", 
		{
			class: "member"
		}, 
		m("img", 
			{
				src: vnode.attrs.photo && vnode.attrs.photo !== "" ? vnode.attrs.photo : "https://placehold.it/500x500", 
				alt: vnode.attrs.name || ""
			}), 
		m("p", 
			{
				class: "info"
			}, 
			vnode.attrs.name || ""), 
		m("p", 
			{
				class: "desc"
			}, 
			vnode.attrs.desc || ""));
} }

const InstagramFeed = { view() {
	return /*[
		m("div", 
			{
				class: "embedsocial-instagram", 
				"data-ref": "1877d21c80dcb591e81d1aad90dc8883fed6588a"
			}), 
		m("script", 
			{}, 
			"(function(d,s,id){if(d.getElementById(id))return;const js=d.createElement(s);js.id=id;js.src='https://embedsocial.com/embedscript/in.js';d.head.appendChild(js);}(document,'script','EmbedSocialInstagramScript'));") ]*/;
} }

export { Navbar, Home, Videos, Team, News, Photos };
