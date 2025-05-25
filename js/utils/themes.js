// ************ Themes ************
var themes = ["Default", "Grayscale", "Inverted", "Oversaturated", "Undersaturated", "Redverted", "Yellowverted", "Greenverted", "Cyanverted", "Blueverted", "Magentaverted", "Random"];

var colors = {
	Default: {
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
		u: "rgba(0, 200, 0, 1)", // Upgrade layer color
		a: "rgba(255, 255, 0, 1)", // Achievements layer color
		c: "rgba(100, 100, 100, 1)", //Click layer color
	},
	Grayscale: {
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
		u: "rgba(67, 67, 67, 1)",
		a: "rgba(170, 170, 170, 1)",
		c: "rgba(100, 100, 100, 1)",
	},
	Inverted: {
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
		u: "rgba(255, 55, 255, 1)",
		a: "rgba(0, 0, 255, 1)",
		c: "rgba(155, 155, 155, 1)",
	},
	Oversaturated: {
		1: "rgba(255, 255, 255, 1)",
		2: "rgba(255, 255, 255, 1)",
		3: "rgba(254, 254, 254, 1)",
		color: "rgba(255, 255, 255, 1)",
		points: "rgba(255, 255, 255, 1)",
		locked: "rgba(255, 255, 255, 1)",
		bought: "rgba(0, 255, 0, 1)",
		background: "rgba(30, 30, 30, 1)",
		background_tooltip: "rgba(0, 0, 0, 1)",
		upgText: "rgba(0, 0, 0, 1)",
		u: "rgba(0, 255, 0, 1)",
		a: "rgba(255, 255, 0, 1)",
		c: "rgba(200, 200, 200, 1)",
	},
	Undersaturated: {
		1: "rgba(128, 128, 128, 1)",
		2: "rgba(96, 96, 96, 1)",
		3: "rgba(64, 64, 64, 1)",
		color: "rgba(112, 112, 112, 1)",
		points: "rgba(128, 128, 128, 1)",
		locked: "rgba(96, 72, 72, 1)",
		bought: "rgba(0, 128, 0, 1)",
		background: "rgba(8, 8, 8, 1)",
		background_tooltip: "rgba(0, 0, 0, 1)",
		upgText: "rgba(0, 0, 0, 1)",
		u: "rgba(0, 100, 0, 1)",
		a: "rgba(128, 128, 0, 1)",
		c: "rgba(50, 50, 50, 1)",
	},
	Redverted: {
		1: "rgba(0, 255, 255, 1)",
		2: "rgba(64, 191, 191, 1)",
		3: "rgba(128, 127, 127, 1)",
		color: "rgba(32, 223, 223, 1)",
		points: "rgba(0, 255, 255, 1)",
		locked: "rgba(64, 143, 143, 1)",
		bought: "rgba(255, 255, 0, 1)",
		background: "rgba(240, 15, 15, 1)",
		background_tooltip: "rgba(255, 0, 0, 1)",
		upgText: "rgba(255, 0, 0, 1)",
		u: "rgba(255, 200, 0, 1)",
		a: "rgba(0, 255, 0, 1)",
		c: "rgba(155, 100, 100, 1)",
	},
	Yellowverted: {
		1: "rgba(0, 0, 255, 1)",
		2: "rgba(64, 64, 191, 1)",
		3: "rgba(128, 128, 127, 1)",
		color: "rgba(32, 32, 223, 1)",
		points: "rgba(0, 0, 255, 1)",
		locked: "rgba(64, 112, 143, 1)",
		bought: "rgba(255, 0, 0, 1)",
		background: "rgba(240, 240, 15, 1)",
		background_tooltip: "rgba(255, 255, 0, 1)",
		upgText: "rgba(255, 255, 0, 1)",
		u: "rgba(255, 55, 0, 1)",
		a: "rgba(0, 0, 0, 1)",
		c: "rgba(155, 155, 100, 1)",
	},
	Greenverted: {
		1: "rgba(255, 0, 255, 1)",
		2: "rgba(191, 64, 191, 1)",
		3: "rgba(127, 128, 127, 1)",
		color: "rgba(223, 32, 223, 1)",
		points: "rgba(255, 0, 255, 1)",
		locked: "rgba(191, 112, 143, 1)",
		bought: "rgba(0, 0, 0, 1)",
		background: "rgba(15, 240, 15, 1)",
		background_tooltip: "rgba(0, 255, 0, 1)",
		upgText: "rgba(0, 255, 0, 1)",
		u: "rgba(0, 55, 0, 1)",
		a: "rgba(255, 0, 0, 1)",
		c: "rgba(100, 155, 100, 1)",
	},
	Cyanverted: {
		1: "rgba(255, 0, 0, 1)",
		2: "rgba(191, 64, 64, 1)",
		3: "rgba(127, 128, 128, 1)",
		color: "rgba(223, 32, 32, 1)",
		points: "rgba(255, 0, 0, 1)",
		locked: "rgba(191, 112, 112, 1)",
		bought: "rgba(0, 0, 255, 1)",
		background: "rgba(15, 240, 240, 1)",
		background_tooltip: "rgba(0, 255, 255, 1)",
		upgText: "rgba(0, 255, 255, 1)",
		u: "rgba(0, 55, 255, 1)",
		a: "rgba(255, 0, 255, 1)",
		c: "rgba(100, 155, 155, 1)",
	},
	Blueverted: {
		1: "rgba(255, 255, 0, 1)",
		2: "rgba(191, 191, 64, 1)",
		3: "rgba(127, 127, 128, 1)",
		color: "rgba(223, 223, 32, 1)",
		points: "rgba(255, 255, 0, 1)",
		locked: "rgba(191, 143, 112, 1)",
		bought: "rgba(0, 255, 255, 1)",
		background: "rgba(15, 15, 240, 1)",
		background_tooltip: "rgba(0, 0, 255, 1)",
		upgText: "rgba(0, 0, 255, 1)",
		u: "rgba(0, 200, 255, 1)",
		a: "rgba(255, 255, 255, 1)",
		c: "rgba(100, 100, 155, 1)",
	},
	Magentaverted: {
		1: "rgba(0, 255, 0, 1)",
		2: "rgba(64, 191, 64, 1)",//
		3: "rgba(128, 127, 128, 1)",
		color: "rgba(32, 223, 32, 1)",
		points: "rgba(0, 255, 0, 1)",
		locked: "rgba(64, 143, 112, 1)",
		bought: "rgba(255, 255, 255, 1)",
		background: "rgba(240, 15, 240, 1)",
		background_tooltip: "rgba(255, 0, 255, 1)",
		upgText: "rgba(255, 0, 255, 1)",
		u: "rgba(255, 200, 255, 1)",
		a: "rgba(0, 255, 255, 1)",
		c: "rgba(155, 100, 155, 1)",
	},
	Random: {} // Will be filled dynamically
}
function changeTheme() {
    // Track seen themes for Explorer achievement
    if (player && player.a && player.a.seenThemes) {
        const currentTheme = options.theme || "Default";
        if (!player.a.seenThemes.includes(currentTheme)) {
            player.a.seenThemes.push(currentTheme);
        }
    }
    if (player && player.themeChangeCount !== undefined) {
        player.themeChangeCount++;
    }
    // Handle Random theme
    if ((options.theme || "Default") === "Random") {
        const props = [
            "1", "2", "3", "color", "points", "locked", "bought", "background",
            "background_tooltip", "upgText", "u", "a", "c"
        ];
        colors.Random = {};
        for (const prop of props) {
            colors.Random[prop] = `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},1)`;
        }
    }
    // Fallback to default if theme is missing
    colors_theme = colors[options.theme] || colors["Default"];
    // Ensure all required properties exist (fallback to default if missing)
    const defaultTheme = colors["Default"];
    const props = [
        "background", "background_tooltip", "color", "points", "locked", "bought", "upgText", "u", "a", "c", "1", "2", "3"
    ];
    for (const prop of props) {
        if (!colors_theme[prop]) colors_theme[prop] = defaultTheme[prop];
    }
    document.body.style.setProperty('--background', colors_theme["background"]);
    document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
    document.body.style.setProperty('--color', colors_theme["color"]);
    document.body.style.setProperty('--points', colors_theme["points"]);
    document.body.style.setProperty("--locked", colors_theme["locked"]);
    document.body.style.setProperty("--bought", colors_theme["bought"]);
    document.body.style.setProperty('--upgText', colors_theme["upgText"]);
    document.body.style.setProperty('--upgradeColor', colors_theme["u"]);
    document.body.style.setProperty('--achievementColor', colors_theme["a"]);
	document.body.style.setProperty('--clickColor', colors_theme["c"]);
}

function getThemeName() {
	return options.theme? options.theme : "Default";
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
