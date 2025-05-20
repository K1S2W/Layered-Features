let modInfo = {
	name: "Layered Features",
	author: "K1S2W",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}
// Set your version in num and name
let VERSION = {
	num: "0.5",
	name: "The Achievements",
}
let changelog = `<h1>Changelog:</h1><br><br>
	<h2>v0.5 (5/20)</h2><br>
		- Changed How Upgrades Are Unlocked.<br>
		- Fixed An Upgrade's Description.<br>
		- Added 5 New Upgrades, Why Aren't The Updates Bigger?<br><br>
	<h3>v0.4.3 (5/19)</h3><br>
		- Fixed A Bug For Achievement Layer.<br>
		- 2 New Themes.<br>
		- Added A Description For The First Achievement.<br>
		- Bug With The First Achievement?<br><br>
	<h3>v0.4.2 (5/18)</h3><br>
		- Quick Change To Bought Upgrade Formatting.<br>
		- Capitalization Fixes For First 5 Upgrades.<br>
		- Changed Description Of "Direct Multiplier".<br>
		- Made The First Achivement Always Display.<br><br>
	<h3>v0.4.1 (5/18)</h3><br>
		- Fixed Bug With First Achievement.<br>
		- Added 3 New Themes.<br>
		- Changed How Upgrades Are Unlocked.<br>
		- Changed Name Of The Game.<br>
		- Uploaded To galaxy.click!<br><br>
	<h2>v0.4 (5/18)</h2><br>
		- Added Dates To The Changelog.<br>
		- Added 5 New Upgrades Again.<br>
		- New Layer(?) Achievements!<br>
		- Flipped Order Of Changelog.<br>
		- Changed Themes To Also Affect Colors Of Layers.<br><br>
	<h3>v0.3.1 (5/17)</h3><br>
		- Changed The Name Of Prestige Points To Upgrade Points.<br>
		- Put Formulas For Upgrades Into Tooltips.<br><br>
	<h2>v0.3 (5/16)</h2><br>
		- 5 New Upgrades.<br>
		- Internal Changes.<br><br>
	<h3>v0.2.1 (5/15)</h3><br>
		- Changed Themes a Bit.<br>
		- Bug Fixes for Mobile.<br><br>
	<h2>v0.2 (5/15)</h2><br>
		- 2 New Themes.<br>
		- Removed a Old Theme.<br>
		- Added 4 New Upgrades.<br><br>
	<h2>v0.1 (5/14)</h2><br>
		- First Upgrade!<br><br>
	<h2>v0.0 (5/13)</h2><br>
		- Setting Names.<br>
		- Added Nothing.`
function getChangelogLength() {
    return changelog.length;
}
let winText = `Congratulations! You have reached the end and beaten this game, but for now...`
// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]
function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}
// Determines if it should show points/sec
function canGenPoints(){
	return true
}
// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('u', 11)) gain = gain.times(2) //Upgrade 11 (check layers.js for details)
	if (hasUpgrade('u', 12)) gain = gain.times(3)
	if (hasUpgrade('u', 13)) gain = gain.times(4)
	if (hasUpgrade('u', 14)) gain = gain.times(5)
	if (hasUpgrade('u', 15)) gain = gain.times(6) //row 1 upgrades end
	if (hasUpgrade('u', 21)) gain = gain.times(upgradeEffect('u', 21))
	if (hasUpgrade('u', 22)) gain = gain.times(upgradeEffect('u', 22))
	if (hasUpgrade('u', 25)) gain = gain.times(upgradeEffect('u', 25))
	if (hasUpgrade('u', 41)) gain = gain.times(upgradeEffect('u', 41))
    if (hasUpgrade('u', 42)) gain = gain.times(upgradeEffect('u', 42))
    if (hasUpgrade('u', 43)) gain = gain.times(upgradeEffect('u', 43))
    if (hasUpgrade('u', 44)) gain = gain.times(upgradeEffect('u', 44))
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}
// Display extra things at the top of the page
var displayThings = [
]
// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("100000000"))
}
// Less important things beyond this point!
// Style for the background, can be a function
var backgroundStyle = {

}
// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}
// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}