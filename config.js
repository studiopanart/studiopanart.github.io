import { request } from "./modules/utils.js"

const channelID = "UC0cULmZZWpWpshTsyUHYiXQ"; // Studio Panart's Youtube channel ID

const defaultRoute = "/accueil"; // Default page routing

const members = [
	{
		photo: "./ressources/members/amin.jpg", 
		name: "Amin Zarour", 
		desc: ""
	}, 
	{
		photo: "./ressources/members/dimitra.jpg", 
		name: "Dimitra Chochos", 
		desc: "Actrice. Étudiante en Sciences Humaine. Accro à la musique"
	}, 
	{
		photo: "./ressources/members/hubert.jpg", 
		name: "Hubert Nunes", 
		desc: "Scénariste et acteur amateur. 1ère année d’un baccalauréat en droit. Accro à la philosophie."
	}, 
	{
		photo: "./ressources/members/joshua.jpg", 
		name: "Joshua Daubioul", 
		desc: ""
	}, 
	{
		photo: "./ressources/members/vincent.jpg", 
		name: "Vincent Copti", 
		desc: "Président et réalisateur. Baccalauréat en commerce. Garde le repos au fond d’un tiroir."
	}, 
	{
		photo: "./ressources/members/emmanuelle.jpg", 
		name: "Emmanuelle Parent", 
		desc: ""
	}, 
	{
		photo: "./ressources/members/paullouis.jpg", 
		name: "Paul-Louis Mas", 
		desc: "Responsable TI, opérateur caméra et directeur photographique. Étudiant en informatique de gestion au cégep de Maisonneuve."
	}, 
	{
		photo: "./ressources/members/philippe.jpg", 
		name: "Philippe Ducas", 
		desc: "Opérateur caméra, perchiste et directeur de tournage. Étudiant en génie logiciel à Polytechnique Montréal."
	}
];

const videosLinks = callback => request(
	"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D" + channelID, 
	({ target: { responseText } }) => callback(JSON.parse(responseText).items));

export { channelID, defaultRoute, members, videosLinks };