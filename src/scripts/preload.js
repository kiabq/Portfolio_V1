// function preload() {
// 	const theme = localStorage.getItem("theme");
// 	const htmlTag = document.getElementsByTagName("html");

// 	const stylesheet = document.styleSheets[4];
// 	stylesheet.insertRule(".preload {}", stylesheet.cssRules.length);

// 	const preload = [...stylesheet.cssRules].find((val) => val.selectorText === ".preload");

// 	const light = stylesheet.cssRules[0].style.getPropertyValue("--lightTheme");
// 	const dark = stylesheet.cssRules[0].style.getPropertyValue("--darkTheme");

// 	if (theme === "light" || theme === null) {
// 	preload.style.setProperty("transform", "translateY(0px)");
// 		htmlTag[0].style.backgroundColor = light;
// 		htmlTag[0].style.color = dark;
// 	} else {
// 	preload.style.setProperty("transform", "translateY(-28px)");
// 		htmlTag[0].style.backgroundColor = dark;
// 		htmlTag[0].style.color = light;
// 	}
// }