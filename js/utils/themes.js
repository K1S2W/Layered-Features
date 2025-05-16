// ************ Themes ************
var themes = ["default", "grayscale", "inverted"]

var colors = {
	default: {
		1: "rgba(255, 255, 255, 1)",//Branch color 1
		2: "rgba(191, 191, 191, 1)",//Branch color 2
		3: "rgba(127, 127, 127, 1)",//Branch color 3
		color: "rgba(223, 223, 223, 1)",
		points: "rgba(255, 255, 255, 1)",
		locked: "rgba(191, 143, 143, 1)",
		bought: "rgba(0, 255, 0, 1)",
		background: "rgba(15, 15, 15, 1)",
		background_tooltip: "rgba(0, 0, 0, 1)",
		upgText: "rgba(0, 0, 0, 1)", // Upgrade text color
	},
	grayscale: {
		1: "rgba(255, 255, 255, 1)",
		2: "rgba(191, 191, 191, 1)",
		3: "rgba(127, 127, 127, 1)",
		color: "rgba(223, 223, 223, 1)",
		points: "rgba(255, 255, 255, 1)",
		locked: "rgba(159, 159, 159, 1)",
		bought: "rgba(85, 85, 85, 1)",
		background: "rgba(15, 15, 15, 1)",
		background_tooltip: "rgba(0, 0, 0, 1)",
		upgText: "rgba(0, 0, 0, 1)",
	},
	inverted: {
		1: "rgba(0, 0, 0, 1)",
		2: "rgba(64, 64, 64, 1)",
		3: "rgba(128, 128, 128, 1)",
		color: "rgba(32, 32, 32, 1)",
		points: "rgba(0, 0, 0, 1)",
		locked: "rgba(64, 112, 112, 1)",
		bought: "rgba(255, 0, 255, 1)",
		background: "rgba(240, 240, 240, 1)",
		background_tooltip: "rgba(255, 255, 255, 1)",
		upgText: "rgba(255, 255, 255, 1)",
	},
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
	document.body.style.setProperty("--bought", colors_theme["bought"]);
	document.body.style.setProperty('--upgText', colors_theme["upgText"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
