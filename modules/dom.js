const attributeExceptions = [ "role" ];

function appendText(el, text) {
	el.appendChild(document.createTextNode(text));
}

function appendArray(el, children) {
	children.forEach((child) => {
		if (Array.isArray(child)) {
			appendArray(el, child);
		} else if (child instanceof window.Element) {
			el.appendChild(child);
		} else if (typeof child === `string`) {
			appendText(el, child);
		}
	});
}

function setStyles(el, styles) {
	if (!styles) {
		el.removeAttribute(`styles`);
		return;
	}

	Object.keys(styles).forEach((styleName) => {
		if (styleName in el.style) {
			el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
		} else {
			console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
		}
	});
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
	const el = document.createElement(type);

	if (Array.isArray(textOrPropsOrChild)) {
		appendArray(el, textOrPropsOrChild);
	} else if (textOrPropsOrChild instanceof window.Element) {
		el.appendChild(textOrPropsOrChild);
	} else if (typeof textOrPropsOrChild === `string`) {
		appendText(el, textOrPropsOrChild);
	} else if (typeof textOrPropsOrChild === `object`) {
		Object.keys(textOrPropsOrChild).forEach((propName) => {
			if (propName in el || attributeExceptions.includes(propName)) {
				const value = textOrPropsOrChild[propName];

				if (propName === `style`) {
					setStyles(el, value);
				} else if (value) {
					el[propName] = value;
				}
			} else {
				console.warn(`${propName} is not a valid property of a <${type}>`);
			}
		});
	}

	if (otherChildren) appendArray(el, otherChildren);

	return el;
}

const E = new Proxy({}, {
	get(obj, prop, proxy) {
		return (...args) => makeElement(String(prop).toLowerCase(), ...args);
	}, 
	set(obj, prop, value, proxy) {}
});

/*
const attributeExceptions = [ "role" ];
const appendText = (el, text) => el.appendChild(document.createTextNode(text));
const appendArray = (el, children) => !children.forEach(child => Array.isArray(child) ? appendArray(el, child) : child instanceof window.Element ? el.appendChild(child) : typeof child === "string" ? appendText(el, child) : null);
const setStyles = (el, styles) => !styles ? !el.removeAttribute("styles") : !Object.keys(styles).forEach(styleName => styleName in el.style ? el.style[styleName] = styles[styleName] : console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`));
const makeElement = (type, textOrPropsOrChild, ...otherChildren) => (el => (Array.isArray(textOrPropsOrChild) ? appendArray(el, textOrPropsOrChild) : textOrPropsOrChild instanceof window.Element ? el.appendChild(textOrPropsOrChild) : typeof textOrPropsOrChild === "string" ? appendText(el, textOrPropsOrChild) : typeof textOrPropsOrChild === "object" ? Object.keys(textOrPropsOrChild).forEach((propName) => propName in el || attributeExceptions.includes(propName) ? (value => propName === "style" ? setStyles(el, value) : el[propName] = value)(textOrPropsOrChild[propName]) : console.warn(`${propName} is not a valid property of a <${type}>`)) : null) && (otherChildren ? appendArray(el, otherChildren) : null) && el)(document.createElement(type));
const E = new Proxy({ attributeExceptions, appendText, appendArray, setStyles, makeElement }, { get: (obj, prop, proxy) => (...args) => makeElement(String(prop).toLowerCase(), ...args), set(obj, prop, value, proxy) {} });
*/

export default E;
