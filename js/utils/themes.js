// ************ Themes ************
// Ensure colors is always defined, even if loaded out of order
if (typeof colors !== 'object' || colors === undefined) {
    window.colors = {};
}

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
		c: "rgba(100, 100, 100, 1)",
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
    // Use the theme key as-is (case-sensitive), but make lookup case-insensitive
    let themeKey = options.theme || "Default";
    // Find the correct key in colors object, ignoring case
    const colorKeys = Object.keys(colors);
    const foundKey = colorKeys.find(k => k.toLowerCase() === themeKey.toLowerCase());
    if (foundKey) themeKey = foundKey; else themeKey = "Default";
    colors_theme = colors[themeKey] || colors["Default"];
    // Ensure all required properties exist (fallback to Default if missing)
    const defaultTheme = colors["Default"];
    const props = [
        "background", "background_tooltip", "color", "points", "locked", "bought", "upgText", "u", "a", "c", "1", "2", "3"
    ];
    for (const prop of props) {
        if (!colors_theme[prop]) colors_theme[prop] = defaultTheme[prop];
    }
    // Patch the original theme object as well, so all usages are safe
    if (!colors[themeKey]) colors[themeKey] = {};
    for (const prop of props) {
        if (!colors[themeKey][prop]) colors[themeKey][prop] = colors_theme[prop];
    }
    // Defensive: fallback to default if still missing
    function safe(val, fallback) { return (typeof val === 'string' && val.length > 0) ? val : fallback; }
    // If background is still missing, force fallback to Default
    if (!colors_theme["background"]) colors_theme["background"] = defaultTheme["background"];
    document.body.style.setProperty('--background', safe(colors_theme["background"], defaultTheme["background"]));
    document.body.style.setProperty('--background_tooltip', safe(colors_theme["background_tooltip"], defaultTheme["background_tooltip"]));
    document.body.style.setProperty('--color', safe(colors_theme["color"], defaultTheme["color"]));
    document.body.style.setProperty('--points', safe(colors_theme["points"], defaultTheme["points"]));
    document.body.style.setProperty("--locked", safe(colors_theme["locked"], defaultTheme["locked"]));
    document.body.style.setProperty("--bought", safe(colors_theme["bought"], defaultTheme["bought"]));
    document.body.style.setProperty('--upgText', safe(colors_theme["upgText"], defaultTheme["upgText"]));
    document.body.style.setProperty('--upgradeColor', safe(colors_theme["u"], defaultTheme["u"]));
    document.body.style.setProperty('--achievementColor', safe(colors_theme["a"], defaultTheme["a"]));
    document.body.style.setProperty('--clickColor', safe(colors_theme["c"], defaultTheme["c"]));
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
