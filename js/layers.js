// Ensure colors is always defined, even if loaded out of order
if (typeof colors !== 'object' || colors === undefined) {
    window.colors = {};
}
addLayer("u", {
    name: "upgrade", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    layerShown() {return true},
    color: () => {
        if (typeof colors !== 'object' || typeof getThemeName !== 'function') return '#888';
        const theme = getThemeName();
        if (!colors[theme] || !colors[theme].u) return '#888';
        return colors[theme].u;
    },
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Upgrade Points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('u', 23)) mult = mult.times(upgradeEffect('u', 23))
        if (hasUpgrade('u', 24)) mult = mult.times(upgradeEffect('u', 24))
        if (hasUpgrade('u', 35)) mult = mult.times(upgradeEffect('u', 25))
        if (hasUpgrade('u', 51)) mult = mult.times(upgradeEffect('u', 41))
        if (hasUpgrade('u', 52)) mult = mult.times(upgradeEffect('u', 42))
        if (hasUpgrade('u', 53)) mult = mult.times(upgradeEffect('u', 43))
        if (hasUpgrade('u', 54)) mult = mult.times(upgradeEffect('u', 44))
        if (hasUpgrade('u', 65)) mult = mult.times(layers.a.achievements[12].effect())
        if (hasUpgrade('u', 74)) mult = mult.times(upgradeEffect('u', 74))
        if (hasUpgrade('u', 84)) mult = mult.times(upgradeEffect('u', 55))
        if (hasUpgrade('u', 94)) mult = mult.times(720)
        if (hasUpgrade('u', 95)) mult = mult.times(5040)
        if (hasUpgrade('u', 101)) mult = mult.times(upgradeEffect('u', 75))
        mult = mult.times(layers.b.buyables[11].effect(getBuyableAmount('b', 11)))
        return mult
    },
    update(diff) {
        if (hasAchievement("a", 11)) {
            let gain = tmp.u.resetGain.times(0.01).times(diff)
            if (hasUpgrade('u', 45)) gain = gain.times(10)
            if (hasUpgrade('u', 113)) gain = gain.times(10)
            player.u.points = player.u.points.add(gain)
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for Upgrade Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat() {
        if (hasUpgrade("u", 113)) return ["main-display", "resource-display", "upgrades"]
        return ["main-display", "prestige-button", "resource-display", "upgrades"]
    },
    upgrades: {
        11: {
            title: "Basic Multiplier",
            description () {
                if (hasUpgrade(this.layer, 94)) return "Double Points, Upgrade Points, And Clicks Gain."
                return "Double Points Gain."
            },
            cost: new Decimal(1),
        },
        12: {
            title: "Basic Multiplier Again",
            description () {
                if (hasUpgrade(this.layer, 94)) return "Triple Points, Upgrade Points, And Clicks Gain."
                return "Triple Points Gain."
            },
            cost: new Decimal(2),
        },
        13: {
            title: "Same As Before",
            description () {
                if (hasUpgrade(this.layer, 94)) return "Quadruple Points, Upgrade Points, And Clicks Gain."
                return "Quadruple Points Gain."
            },
            cost: new Decimal(6),
        },
        14: {
            title: "Over and Over",
            description () {
                if (hasUpgrade(this.layer, 94)) return "Quintuple Points, Upgrade Points, And Clicks Gain."
                return "Quintuple Points Gain."
            },
            cost: new Decimal(24),
        },
        15: {
            title: "I Got Lazy",
            description () {
                if (hasUpgrade(this.layer, 94)) return "Sextuple Points, Upgrade Points, And Clicks Gain."
                return "Sextuple Points Gain."
            },
            cost: new Decimal(120),
        },
        21: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 91)) return player[this.layer].points.add(8).log(8)
                if (hasUpgrade(this.layer, 31)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect, required
            title: "New Type!",
            description: "Multiply Points By Upgrade Points.",
            tooltip() {
                if (hasUpgrade(this.layer, 91)) return "Log8(Upgrade Points + 8)"
                if (hasUpgrade(this.layer, 31)) return "Log9(Upgrade Points + 9)"
                return "Log10(Upgrade Points + 10)"
            },
            cost: new Decimal(500),
        },
        22: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 91)) return player.points.add(8).log(8)
                if (hasUpgrade(this.layer, 32)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Self Powered",
            description: "Multiply Points By Itself.",
            tooltip() {
                if (hasUpgrade(this.layer, 91)) return "Log8(Points + 8)"
                if (hasUpgrade(this.layer, 32)) return "Log9(Points + 9)"
                return "Log10(Points + 10)"
            },
            cost: new Decimal(1000),
        },
        23: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 91)) return player[this.layer].points.add(8).log(8)
                if (hasUpgrade(this.layer, 33)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Copy Paste",
            description: "Multiply Upgrade Points By Itself.",
            tooltip() {
                if (hasUpgrade(this.layer, 91)) return "Log8(Upgrade Points + 8)"
                if (hasUpgrade(this.layer, 33)) return "Log9(Upgrade Points + 9)"
                return "Log10(Upgrade Points + 10)"
            },
            cost: new Decimal(2500),
        },
        24: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 91)) return player.points.add(8).log(8)
                if (hasUpgrade(this.layer, 34)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Once Again",
            description: "Multiply Upgrade Points By Points.",
            tooltip() {
                if (hasUpgrade(this.layer, 91)) return "Log8(Points + 8)"
                if (hasUpgrade(this.layer, 34)) return "Log9(Points + 9)"
                return "Log10(Points + 10)"
            },
            cost: new Decimal(7500),
        },
        25: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                return player["u"].upgrades.length
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Direct Multiplier",
            description() {
                if (hasUpgrade(this.layer, 83)) return "Multiply Points, Upgrade Points, And Clicks By Upgrades Bought."
                if (hasUpgrade(this.layer, 35)) return "Multiply Points And Upgrade Points By Upgrades Bought."
                return "Multiply Points By Upgrades Bought."
            },
            tooltip: "(Upgrades Bought)^1",
            cost: new Decimal(25000),
        },
        31: {
            unlocked() {
                return [21, 22, 23, 24, 25].every(id => hasUpgrade('u', id))
            },
            title: "Improvement",
            description: "Improves \"New Type!\" Formula.",
            cost: new Decimal(75000),
        },
        32: {
            unlocked() {
                return [21, 22, 23, 24, 25].every(id => hasUpgrade('u', id))
            },
            title: "<-",
            description: "Improves \"Self Powered\" Formula.",
            cost: new Decimal(125000),
        },
        33: {
            unlocked() {
                return [21, 22, 23, 24, 25].every(id => hasUpgrade('u', id))
            },
            title: "These Are Useless",
            description: "Improves \"Copy Paste\" Formula.",
            cost: new Decimal(175000),
        },
        34: {
            unlocked() {
                return [21, 22, 23, 24, 25].every(id => hasUpgrade('u', id))
            },
            title: "Why?",
            description: "Improves \"Once Again\" Formula.",
            cost: new Decimal(225000),
        },
        35: {
            unlocked() {
                return [21, 22, 23, 24, 25].every(id => hasUpgrade('u', id))
            },
            title: "Worth The Wait",
            description: "\"Direct Multiplier\" Also Applies To Upgrade Point Gain, Unlock Achievements.",
            cost: new Decimal(300000),
        },
        41: {
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                if (hasUpgrade(this.layer, 92)) return new Decimal(getChangelogLength()).pow(1)
                return new Decimal(getChangelogLength()).pow(0.5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Misc Upgrades",
            description() {
                if (hasUpgrade(this.layer, 83)) return "Multiplies Points, Upgrade Points, And Clicks By Changelog Length."
                if (hasUpgrade(this.layer, 51)) return "Multiplies Points And Upgrade Points By Changelog Length."
                return "Multiplies Points By Changelog Length."
            },
            tooltip() {
                if (hasUpgrade(this.layer, 92)) return "(Changelog Length)^1"
                return "(Changelog Length)^0.5"
            },
            cost: new Decimal(5000000),
        },
        42: {
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                // Only count normal achievements (IDs <20)
                const normalAchCount = Object.keys(layers.a.achievements).filter(x => !isNaN(Number(x)) && Number(x) < 20 && hasAchievement('a', x)).length;
                if (hasUpgrade(this.layer, 92)) return new Decimal(normalAchCount).pow(2)
                return new Decimal(normalAchCount)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Useless For Now...",
            description: "Multiplies Points By Achievements.",
            description() {
                if (hasUpgrade(this.layer, 83)) return "Multiplies Points, Upgrade Points, And Clicks By Achievements."
                if (hasUpgrade(this.layer, 52)) return "Multiplies Points And Upgrade Points By Achievements."
                return "Multiplies Points By Achievements."
            },
            tooltip() {
                if (hasUpgrade(this.layer, 92)) return "(Achievements)^2"
                return "(Achievements)^1"
            },
            cost: new Decimal(50000000),
        },
        43: {
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                if (hasUpgrade(this.layer, 92)) return new Decimal(Object.keys(themes).length).pow(2)
                return Object.keys(themes).length
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Themes Are Uselful?",
            description() {
                if (hasUpgrade(this.layer, 83)) return "Multiplies Points, Upgrade Points, And Clicks By Themes."
                if (hasUpgrade(this.layer, 53)) return "Multiplies Points And Upgrade Points By Themes."
                return "Multiplies Points By Themes."
            },
            tooltip () {
                if (hasUpgrade(this.layer, 92)) return "(Themes)^2"
                return "(Themes)^1"
            },
            cost: new Decimal(60000000),
        },
        44:{
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                if (hasUpgrade(this.layer, 92)) return new Decimal(player.timePlayed).add(8).log(8)
                if (hasUpgrade(this.layer, 85)) return new Decimal(player.timePlayed).add(9).log(9)
                return new Decimal(player.timePlayed).add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Afk!",
            description() {
                if (hasUpgrade(this.layer, 83)) return "Multiplies Points, Upgrade Points, And Clicks By Time Played."
                if (hasUpgrade(this.layer, 54)) return "Multiplies Points And Upgrade Points By Time Played."
                return "Multiplies Points By Time Played."
            },
            tooltip() {
                if (hasUpgrade(this.layer, 92)) return "Log8(Seconds Played + 8)"
                if (hasUpgrade(this.layer, 85)) return "Log9(Seconds Played + 9)"
                return "Log10(Seconds Played + 10)"
            },
            cost: new Decimal("2e8"),
        },
        45:{
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            title: "Better Automation",
            description: "Improves \"Passive Generation\".",
            cost: new Decimal("5e8"),
        },
        51:{
            unlocked() {
                return [41, 42, 43, 44, 45].every(id => hasUpgrade('u', id))
            },
            title: "Improvement Row v2",
            description: "\"Misc Upgrades\" Also Affects Prestige Points.",
            cost: new Decimal("5e9"),
        },
        52:{
            unlocked() {
                return [41, 42, 43, 44, 45].every(id => hasUpgrade('u', id))
            },
            title: "These Rows Are So Repetative",
            description: "\"Useless For Now...\" Also Affects Prestige Points.",
            cost: new Decimal("2e11"),
        },
        53:{
            unlocked() {
                return [41, 42, 43, 44, 45].every(id => hasUpgrade('u', id))
            },
            title: "Daily Updates = Bad Balancing?",
            description: "\"Themes Are Uselful?\" Also Affects Prestige Points.",
            cost: new Decimal("3e11"),
        },
        54:{
            unlocked() {
                return [41, 42, 43, 44, 45].every(id => hasUpgrade('u', id))
            },
            title: "Repitition Is Basically Every TMT Mod Anyways",
            description: "\"Afk!\" Also Affects Prestige Points.",
            cost: new Decimal("3e12"),
        },
        55:{
            unlocked() {
                return [41, 42, 43, 44, 45].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 65)) return new Decimal(102)
                return new Decimal(22)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "There Is Really No Limit To The Length Of This Text, If I Wanted To Then This Could Be A Whole Essay!",
            description() {
                if (hasUpgrade(this.layer, 84)) return "Unlock A New Achievement, Boost Points, Upgrade Points, And Clicks By Characters In The Name Of This Upgrade."
                if (hasUpgrade(this.layer, 65)) return "Unlock A New Achievement, Boost Points By Characters In The Name Of This Upgrade."
                return "Unlock A New Achievement, Boost Points By Words In The Name Of This Upgrade."
            },
            tooltip() {
                if (hasUpgrade(this.layer, 65)) return "(Characters In The Name Of This Upgrade)^1"
                return "(Words In The Name Of This Upgrade)^1"
            },
            cost: new Decimal("2e13"),
        },
        61: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "De Ja Vu",
            description () {
                if (hasUpgrade(this.layer, 95)) return "Septuple Points, Upgrade Points, And Clicks Gain."
                return "Septuple Points Gain."
            },
            cost: new Decimal("1e14"),
        },
        62: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "Are These Even Words?",
            description () {
                if (hasUpgrade(this.layer, 95)) return "Octuple Points, Upgrade Points, And Clicks Gain."
                return "Octuple Points Gain."
            },
            cost: new Decimal("3e14"),
        },
        63: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "Still Strong",
            description () {
                if (hasUpgrade(this.layer, 95)) return "Nonuple Points, Upgrade Points, And Clicks Gain."
                return "Nonuple Points Gain."
            },
            cost: new Decimal("1e15"),
        },
        64: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "10!",
            description () {
                if (hasUpgrade(this.layer, 95)) return "Decuple Points, Upgrade Points, And Clicks Gain."
                return "Decuple Points Gain."
            },
            cost: new Decimal("3e15"),
        },
        65: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "No More?",
            description: "\"New Tab!\" Also Applies To Upgrade Points, Buff The Upgrade Above.",
            cost: new Decimal("1e16"),
        },
        71: {
            unlocked() {
                return [61, 62, 63, 64, 65].every(id => hasUpgrade('u', id))
            },
            title: "Another Feature So Soon!",
            description: "Unlocks Clicking.",
            cost: new Decimal("2e16"),
        },
        72: {
            unlocked() {
                return [61, 62, 63, 64, 65].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return player.c.clicks.add(9).log(9)
                return player.c.clicks.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Not Again...",
            description: "Clicks Boost Itself.",
            tooltip() {
                if (hasUpgrade(this.layer, 93)) return "Log9(Clicks + 9)"
                return "Log10(Clicks + 10)"
            },
            cost: new Decimal("3e16"),
        },
        73: {
            unlocked() {
                return [61, 62, 63, 64, 65].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return player.c.clicks.add(9).log(9)
                return player.c.clicks.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Finally Useful",
            description: "Clicks Boost Points.",
            tooltip () {
                if (hasUpgrade(this.layer, 93)) return "Log9(Clicks + 9)"
                return "Log10(Clicks + 10)"
            },
            cost: new Decimal("5e16"),
        },
        74: {
            unlocked() {
                return [61, 62, 63, 64, 65].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return player.c.clicks.add(9).log(9)
                return player.c.clicks.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Super Effective",
            description: "Clicks Boost Upgrade Points.",
            tooltip () {
                if (hasUpgrade(this.layer, 93)) return "Log9(Clicks + 9)"
                return "Log10(Clicks + 10)"
            },
            cost: new Decimal("1e17"),
        },
        75: {
            unlocked() {
                return [61, 62, 63, 64, 65].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return new Decimal(Object.keys(player).filter(key => layers[key]).length).minus(5).pow(2)
                return new Decimal(Object.keys(player).filter(key => layers[key]).length).minus(5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Mid",
            description () {
                if (hasUpgrade("u", 101)) return "Layers Boost Points, Upgrade Points, And Clicks."
                return "Layers Boost Points"
            },
            tooltip () {
                if (hasUpgrade(this.layer, 93)) return "(Layers)^2"
                return "(Layers)^1"
            },
            cost: new Decimal("5e17"),
        },
        81: {
            unlocked() {
                return [71, 72, 73, 74, 75].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "AGAIN???",
            description: "Points Boost Clicks",
            tooltip () {
                if (hasUpgrade(this.layer, 93)) return "Log9(Clicks + 9)"
                return "Log10(Clicks + 10)"
            },
            cost: new Decimal("1e18"),
        },
        82: {
            unlocked() {
                return [71, 72, 73, 74, 75].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 93)) return player.u.points.add(9).log(9)
                return player.u.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Please No More :(",
            description: "Upgrade Points Boost Clicks",
            tooltip () {
                if (hasUpgrade(this.layer, 93)) return "Log9(Clicks + 9)"
                return "Log10(Clicks + 10)"
            },
            cost: new Decimal("2e18"),
        },
        83: {
            unlocked() {
                return [71, 72, 73, 74, 75].every(id => hasUpgrade('u', id))
            },
            title: "Strengthening",
            description: "5 Upgrades And An Achievement Also Boost Clicks.",
            cost: new Decimal("3e18"),
        },
        84: {
            unlocked() {
                return [71, 72, 73, 74, 75].every(id => hasUpgrade('u', id))
            },
            title: "Too Long Of A Reference",
            description: "\"There Is Really No Limit To The Length Of This Text, If I Wanted To Then This Could Be A Whole Essay!\" Also Applies To Upgrade Points And Clicks.",
            cost: new Decimal("5e18"),
        },
        85: {
            unlocked() {
                return [71, 72, 73, 74, 75].every(id => hasUpgrade('u', id))
            },
            title: "Back To Weakness",
            description: "\"Afk!\" Is Stronger.",
            cost: new Decimal("7.5e20"),
        },
        91: {
            unlocked() {
                return [81, 82, 83, 84, 85].every(id => hasUpgrade('u', id))
            },
            title: "Mass Boosting",
            description: "4 Row 2 Upgrades Are Stronger.",
            cost: new Decimal("7.5e20"),
        },
        92: {
            unlocked() {
                return [81, 82, 83, 84, 85].every(id => hasUpgrade('u', id))
            },
            title: "Mass Boosting Round 2",
            description: "4 Row 4 Upgrades Are Stronger.",
            cost: new Decimal("1e21"),
        },
        93: {
            unlocked() {
                return [81, 82, 83, 84, 85].every(id => hasUpgrade('u', id))
            },
            title: "Mass Boosting Round 3!",
            description: "6 Row 7 And 8 Upgrades Are Stronger.",
            cost: new Decimal("1e25"),
        },
        94: {
            unlocked() {
                return [81, 82, 83, 84, 85].every(id => hasUpgrade('u', id))
            },
            title: "Mass Effectiveness!",
            description: "Row 1 Upgrades Affect Upgrade Points And Clicks.",
            cost: new Decimal("3e25"),
        },
        95: {
            unlocked() {
                return [81, 82, 83, 84, 85].every(id => hasUpgrade('u', id))
            },
            title: "Mass Effectiveness Round 2!",
            description: "4 Row 6 Upgrades Affect Upgrade Points And Clicks.",
            cost: new Decimal("2.5e28"),
        },
        101: {
            unlocked() {
                return [91, 92, 93, 94, 95].every(id => hasUpgrade('u', id))
            },
            title: "Left Behind",
            description: "\"Mid\" Boosts Prestige Points And Clicks.",
            cost: new Decimal("2e32"),
        },
        102: {
            unlocked() {
                return [91, 92, 93, 94, 95].every(id => hasUpgrade('u', id))
            },
            title: "Automation v2",
            description: "Automatically Click The \"Click\" Button.",
            tooltip() {
                if (hasUpgrade('u', 104)) return "25 Clicks Per Second."
                if (hasUpgrade('u', 103)) return "5 Clicks Per Second."
                return "1 Click Per Second."
            },
            cost: new Decimal("2e33"),
        },
        103: {
            unlocked() {
                return [91, 92, 93, 94, 95].every(id => hasUpgrade('u', id))
            },
            title: "Too Slow",
            description: "Improve \"Automation v2\".",
            cost: new Decimal("3e33"),
        },
        104: {
            unlocked() {
                return [91, 92, 93, 94, 95].every(id => hasUpgrade('u', id))
            },
            title: "FASTER!",
            description: "Improve \"Automation v2\" Again.",
            cost: new Decimal("5e33"),
        },
        105: {
            unlocked() {
                return [91, 92, 93, 94, 95].every(id => hasUpgrade('u', id))
            },
            title: "Another Reset Layer?",
            description: "Unlock Buyables!",
            cost: new Decimal("1e34"),
        },
        111: {
            unlocked() {
                return [101, 102, 103, 104, 105].every(id => hasUpgrade('u', id))
            },
            title: "Done Already?",
            description: "Increase The Maximum For \"Buyable Doubling\" To 10.",
            cost: new Decimal("2.5e36"),
        },
        112: {
            unlocked() {
                return [101, 102, 103, 104, 105].every(id => hasUpgrade('u', id))
            },
            title: "Somewhat Useful?",
            description: "\"New Tab!\" Also Buffs Buyable Points And Is Stronger.",
            cost: new Decimal("2.5e37"),
        },
        113: {
            unlocked() {
                return [101, 102, 103, 104, 105].every(id => hasUpgrade('u', id))
            },
            title: "Finally!",
            description: "\"Passive Generation\" Is Stronger And Disable Upgrade Point Resets.",
            cost: new Decimal("2.5e38"),
        },
        114: {
            unlocked() {
                return [101, 102, 103, 104, 105].every(id => hasUpgrade('u', id))
            },
            effect() {
                return player.b.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Not These Again...",
            description: "Boost Points Based On Buyable Points.",
            tooltip() {
                return "Log10(Buyable Points + 10)"
            },
            cost: new Decimal("7e39"),
        },
        115: {
            unlocked() {
                return [101, 102, 103, 104, 105].every(id => hasUpgrade('u', id))
            },
            title: "Automation- Oh Wait I Spoiled It",
            description: "Unlock A New Achievement.",
            cost: new Decimal("1e40"),
        },
        121: {
            unlocked() {
                return [111, 112, 113, 114, 115].every(id => hasUpgrade('u', id))
            },
            effect() {
                return Math.round(player.b.points.add(10).log(10))
            },
            effectDisplay() {return "+" + format(upgradeEffect(this.layer, this.id))},
            title: "teh end",
            description: "Adds Free Levels To \"Buyable Doubling\"",
            tooltip() {
                return "Round(Log10(Buyable Points + 10))"
            },
            cost: new Decimal("1.5e40"),
        },
        122: {
            unlocked() {
                return [121].every(id => hasUpgrade('u', id))
            },
            title: "teh end but fr",
            description: "<marquee>NaN!!!</marquee>",
            cost: new Decimal("1e42"),
        },
    },
})
// Global Achievements Layer
addLayer("a", {
    name: "Achievements",
    symbol: "A",
    position: 1,
    row: "side", // Side layer for achievements
    type: "none",
    startData() { return {
        unlocked: false,
        seenThemes: [], // Track seen themes
    }},
    color: () => {
        try {
            if (typeof colors !== 'object' || typeof getThemeName !== 'function') {
                console.warn('Achievements layer: colors object or getThemeName function missing, using fallback.', { colors, getThemeName });
                return '#888';
            }
            const theme = getThemeName();
            if (!theme || typeof theme !== 'string') return '#888';
            if (!colors[theme] || typeof colors[theme] !== 'object' || !('a' in colors[theme])) {
                console.warn('Achievements layer: theme or color missing, using fallback.', { theme, themeColors: colors ? colors[theme] : undefined, colors });
                return '#888';
            }
            return colors[theme].a;
        } catch (e) {
            console.warn('Achievements layer: error in color function, using fallback.', e);
            return '#888';
        }
    },
    tooltip: "Achievements",
    layerShown() {return hasUpgrade("u", 35)},
    unlocked() {return true},
    microtabs: {
        achievements: {
            "Normal": {
                content: [
                    ["achievements", [1]]
                ]
            },
            "Secret": {
                content: [
                    ["achievements", [2]]
                ],
                unlocked() {return hasAchievement("a", 12)}
            }
        }
    },
    tabFormat: [
        "main-display",
        ["microtabs", "achievements"],
    ],
    achievements: {
        11: {
            unlocked() {return true},
            name: "Passive Generation",
            done() {return player.points.gte(10000000) && hasUpgrade("u", 35)},
            description: "Reach 10M(10,000,000) Points.",
            tooltip() {
                if(hasUpgrade("u", 113)) return "Generate 100% Of Upgrade Points Per Second."
                if(hasUpgrade("u", 45)) return "Generate 10% Of Upgrade Points Per Second."
                if(hasAchievement("a", 11)) return "Generate 1% Of Upgrade Points Per Second."
                return "???"
            }
        },
        12: {
            effect() {
                if (hasUpgrade("u", 112)) return new Decimal(1.2).pow(Object.keys(layers.a.achievements).filter(x => Number(x) >= 20 && hasAchievement('a', x)).length)
                return new Decimal(1.1).pow(Object.keys(layers.a.achievements).filter(x => Number(x) >= 20 && hasAchievement('a', x)).length)
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
            unlocked() {return hasUpgrade("u", 55)},
            name: "New Tab!",
            done() {return player.u.points.gte("5e13") && hasUpgrade("u", 55)},
            description() {
                return "Reach 5e13 Upgrade Points."
            },
            tooltip() {
                if(hasUpgrade("u", 112)) return "Unlock Secret Achievements And Boost Points, Upgrade Points, Clicks, And Buyable Points By Secret Achievements. (1.2^SA)"
                if(hasUpgrade("u", 83)) return "Unlock Secret Achievements And Boost Points, Upgrade Points, And Clicks By Secret Achievements. (1.1^SA)"
                if(hasUpgrade("u", 65)) return "Unlock Secret Achievements And Boost Points And Upgrade Points By Secret Achievements. (1.1^SA)"
                if(hasAchievement("a", 12)) return "Unlock Secret Achievements And Boost Points By Secret Achievements. (1.1^SA)"
                return "???"
            }
        },
        13: {
            unlocked() {return hasUpgrade("u", 115)},
            name: "Passive Generation But Again",
            done() {return player.b.points.gte(1000) && hasUpgrade("u", 115)},
            description: "Reach 1,000 Buyable Points.",
            tooltip() {
                if(hasAchievement("a", 11)) return "Generate 1% Of Buyable Points Per Second."
                return "???"
            }
        },
        21: {
            name: "Explorer",
            done() {
                // Check if all themes have been seen
                if (!player.a.seenThemes) return false;
                return themes.every(theme => player.a.seenThemes.includes(theme)) && hasAchievement("a", 12);
            },
            description () {
                if (hasAchievement("a", 21)) return "See Every Theme."
                return "???"
            },
            unlocked() {return true},
            tooltip: "Custom Made!"
        },
        22: {
            name: "Just To Be Safe",
            done() {
                return player.saveCount >= 100 && hasAchievement("a", 12)
            },
            description () {
                if (hasAchievement("a", 22)) return "Save 100 Times."
                return "???"
            },
            unlocked() {return true},
            tooltip: "That's A Bit Too Much."
        },
        23: {
            name: "Seizure Warning",
            done() {
                return player.themeChangeCount >= 100 && hasAchievement("a", 12)
            },
            description () {
                if (hasAchievement("a", 23)) return "Switch The Theme 100 Times."
                return "???"
            },
            unlocked() {return true},
            tooltip: "Are You Okay?"
        },
        24: {
            name: "Debuffed",
            done() {
                return player.offlineProdDisabled && hasAchievement("a", 12)
            },
            description () {
                if (hasAchievement("a", 24)) return "Disable Offline Production."
                return "???"
            },
            unlocked() {return true},
            tooltip: "Why Would You Need To Do That?"
        },
        25: {
            name: "Interesting",
            done() {
                return player.checkedUpdateLog && hasAchievement("a", 12)
            },
            description () {
                if (hasAchievement("a", 25)) return "Check The Update Log."
                return "???"
            },
            unlocked() {return true},
            tooltip: "Good Job!"
        },
    },
})
//Clicking Layer
addLayer("c", {
    name: "Click",
    symbol: "C",
    position: 2, // Appears after Achievements on the side
    row: "side", // Side layer
    type: "none", // No prestige mechanics, just clicking
    startData() { return {
        unlocked: true,
        clicks: new Decimal(0),
    }},
    color: () => {
        if (typeof colors !== 'object' || typeof getThemeName !== 'function') return '#888';
        const theme = getThemeName();
        if (!colors[theme] || !colors[theme].c) return '#888';
        return colors[theme].c;
    },
    tooltip: "Clicking",
    layerShown() {return hasUpgrade('u', 71)}, //change this
    tabFormat: [
        "main-display",
        ["display-text", function() {return `You have <b>${format(player.c.clicks)}</b> clicks.`}],
        ["clickable", 11],
    ],
    clickables: {
        11: {
            title: "Click",
            canClick() {return true},
            onClick() {player.c.clicks = player.c.clicks.add(this.gainClicks())},
            gainClicks() { // Calculate the multiplier for main currency from bonuses
                let click = new Decimal(1)
                if (hasUpgrade('u', 72)) click = click.times(upgradeEffect('u', 72))
                if (hasUpgrade('u', 81)) click = click.times(upgradeEffect('u', 81))
                if (hasUpgrade('u', 82)) click = click.times(upgradeEffect('u', 82))
                if (hasUpgrade('u', 83)) click = click.times(upgradeEffect('u', 25))
                if (hasUpgrade('u', 83)) click = click.times(upgradeEffect('u', 41))
                if (hasUpgrade('u', 83)) click = click.times(upgradeEffect('u', 42))
                if (hasUpgrade('u', 83)) click = click.times(upgradeEffect('u', 43))
                if (hasUpgrade('u', 83)) click = click.times(upgradeEffect('u', 44))
                if (hasUpgrade('u', 83)) click = click.times(layers.a.achievements[12].effect())
                if (hasUpgrade('u', 84)) click = click.times(upgradeEffect('u', 55))
                if (hasUpgrade('u', 94)) click = click.times(720)
                if (hasUpgrade('u', 95)) click = click.times(5040)
                if (hasUpgrade('u', 101)) click = click.times(upgradeEffect('u', 75))
                click = click.times(layers.b.buyables[11].effect(getBuyableAmount('b', 11)))
                return click
            },
            style: {width: "200px", height: "60px", fontSize: "20px"},
        },
    },
    update(diff) {
        if (hasUpgrade('u', 104)) {
            player.c.clicks = player.c.clicks.add(this.clickables[11].gainClicks().times(diff).times(25));
        }
        else if (hasUpgrade('u', 103)) {
            player.c.clicks = player.c.clicks.add(this.clickables[11].gainClicks().times(diff).times(5));
        }
        else if (hasUpgrade('u', 102)) {
            player.c.clicks = player.c.clicks.add(this.clickables[11].gainClicks().times(diff));
        }
    },
})
addLayer("b", {
    name: "Buyables",
    symbol: "B",
    position: 3, // After Click layer
    row: 0, // Main row
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        buyables: { 11: new Decimal(0) }, // Ensure buyables are initialized
    }},
    color: () => {
        if (typeof colors !== 'object' || typeof getThemeName !== 'function') return '#888';
        const theme = getThemeName();
        if (!colors[theme] || !colors[theme].b) return '#888';
        return colors[theme].b;
    },
    requires: new Decimal(1e24), // Cost to reset for buyable points
    resource: "Buyable Points",
    baseResource: "Points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.4,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('u', 112)) mult = mult.times(layers.a.achievements[12].effect())
        return mult
    },
    gainExp() {return new Decimal(1)},
    layerShown() {return hasUpgrade('u', 105)},
    hotkeys: [
        {key: "b", description: "B: Reset for Buyable Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
    ],
    update(diff) {
        if (hasAchievement("a", 13)) {
            let gain = tmp.b.resetGain.times(0.01).times(diff)
            player.b.points = player.b.points.add(gain)
        }
    },
    buyables: {
        11: {
            cost(x) {return new Decimal(2).pow(x)},
            effect(x) {
                if (hasUpgrade('u', 122)) {
                    return new Decimal(2).pow(new Decimal(x + upgradeEffect('u', 121)));
                }
                let extra = 0;
                if (hasUpgrade("u", 121)) {
                    extra = upgradeEffect('u', 121);
                    if (extra === undefined || isNaN(extra)) extra = 0;
                }
                return new Decimal(2).pow(new Decimal(x).plus(extra));
            },
            canAfford() {return player.b.points.gte(this.cost(getBuyableAmount('b', 11)))},
            buy() {
                player.b.points = player.b.points.sub(this.cost(getBuyableAmount('b', 11)))
                setBuyableAmount("b", 11, getBuyableAmount("b", 11).add(1))
            },
            title: "Buyable Doubling",
            display() {
                if (hasUpgrade("u", 121)) return  `Doubles Points, Upgrade Points, And Clicks.\nLevel: ${getBuyableAmount('b', 11)}/${this.purchaseLimit().toNumber()} + ${upgradeEffect('u', 121)}\nEffect: x${format(this.effect(getBuyableAmount('b', 11)))}\nCost: ${format(this.cost(getBuyableAmount('b', 11)))} buyable points`
                return `Doubles Points, Upgrade Points, And Clicks.\nLevel: ${getBuyableAmount('b', 11)}/${this.purchaseLimit().toNumber()}\nEffect: x${format(this.effect(getBuyableAmount('b', 11)))}\nCost: ${format(this.cost(getBuyableAmount('b', 11)))} buyable points`
            },
            unlocked() {return true},
            purchaseLimit() {
                return hasUpgrade('u', 111) ? new Decimal(10) : new Decimal(5);
            },
        },
    },
})