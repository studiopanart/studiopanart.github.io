const request = (url, callback) => {
	const x = new XMLHttpRequest();

	x.open("GET", url);
	x.addEventListener("load", callback);
	x.send(null);
}

const setView = view => {
	const navbar = document.getElementById("navbar");
	const navbar_list = navbar.querySelector("nav > ul");
	const navbar_items = navbar_list.querySelectorAll("li[data-href]");

	location.hash = view;

	view = view.replace(/[^a-zA-Z0-9_\/-]/g, "");

	navbar_items.forEach(element => element.classList.remove("navbar__current"));

	const current = Array.from(navbar_items).filter(e => e.attributes["data-href"].value === view);

	if (current.length !== 1)
		throw new Error("Tried setting current navbar element to unknown value \"" + view + "\"");

	current[0].classList.add("navbar__current");

	navbar_list.classList.remove("navbar__expanded");
}

const loadTwitter = () => {
	const container = document.createElement("script");

	container.setAttribute("async", "1");
	container.setAttribute("charset", "utf-8");
	container.src = "https://platform.twitter.com/widgets.js";

	document.head.appendChild(container);
}

export { request, setView, loadTwitter };