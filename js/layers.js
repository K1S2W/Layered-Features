addLayer("u", {
    name: "upgrade", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    layerShown() {return true},
    color: () => colors[getThemeName()].u, // Dynamic color based on theme
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "upgrade points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
        return mult
    },
    update(diff) {
        if (hasAchievement("a", 11)) {
            let gain = tmp.u.resetGain.times(0.01).times(diff)
            if (hasUpgrade('u', 45)) gain = gain.times(10)
            player.u.points = player.u.points.add(gain)
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for upgrade points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Basic Multiplier",
            description: "Double Points Gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Basic Multiplier Again",
            description: "Triple Points Gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Same As Before",
            description: "Quadruple Points Gain.",
            cost: new Decimal(6),
        },
        14: {
            title: "Over and Over",
            description: "Quintuple Points Gain.",
            cost: new Decimal(24),
        },
        15: {
            title: "I Got Lazy",
            description: "Sextuple Points Gain.",
            cost: new Decimal(120),
        },
        21: {
            unlocked() {
                return [11, 12, 13, 14, 15].every(id => hasUpgrade('u', id))
            },
            effect() {
                if (hasUpgrade(this.layer, 31)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect, required
            title: "New Type!",
            description: "Multiply Points By Upgrade Points.",
            tooltip() {
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
                if (hasUpgrade(this.layer, 32)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Self Powered",
            description: "Multiply Points By Itself.",
            tooltip() {
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
                if (hasUpgrade(this.layer, 33)) return player[this.layer].points.add(9).log(9)
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Copy Paste",
            description: "Multiply Upgrade Points By Itself.",
            tooltip() {
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
                if (hasUpgrade(this.layer, 34)) return player.points.add(9).log(9)
                return player.points.add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            title: "Once Again",
            description: "Multiply Upgrade Points By Points.",
            tooltip() {
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
                return new Decimal(getChangelogLength()).pow(0.5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Misc Upgrades",
            description() {
                if (hasUpgrade(this.layer, 51)) return "Multiplies Points And Upgrade Points By Changelog Length."
                return "Multiplies Points By Changelog Length."
            },
            tooltip: "(Changelog Length)^0.5",
            cost: new Decimal(5000000),
        },
        42: {
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                return new Decimal(Object.keys(layers.a.achievements).filter(x => !isNaN(Number(x)) && hasAchievement('a', x)).length)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Useless For Now...",
            description: "Multiplies Points By Achievements.",
            description() {
                if (hasUpgrade(this.layer, 52)) return "Multiplies Points And Upgrade Points By Achievements."
                return "Multiplies Points By Achievements."
            },
            tooltip: "(Achievements Unlocked)^1",
            cost: new Decimal(50000000),
        },
        43: {
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                return Object.keys(themes).length
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Themes Are Uselful?",
            description() {
                if (hasUpgrade(this.layer, 53)) return "Multiplies Points And Upgrade Points By Themes."
                return "Multiplies Points By Themes."
            },
            tooltip: "(Themes)^1",
            cost: new Decimal(60000000),
        },
        44:{
            unlocked() {
                return [31, 32, 33, 34, 35].every(id => hasUpgrade('u', id)) && hasAchievement('a', 11)
            },
            effect() {
                return new Decimal(player.timePlayed).add(10).log(10)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
            unlocked() {return hasAchievement('a', 11)},
            title: "Afk!",
            description() {
                if (hasUpgrade(this.layer, 54)) return "Multiplies Points And Upgrade Points By Time Played."
                return "Multiplies Points By Time Played."
            },
            tooltip: "Log10(Seconds Played + 10)",
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
            title: "There Is Really No Limit To The Length Of This Text, If I Wanted To Then This Could Be A Whole Essay!",
            description() {
                if (hasUpgrade(this.layer, 65)) return "Unlock More Achievements, Boost Points By Characters In The Name Of This Upgrade."
                return "Unlock More Achievements, Boost Points By Words In The Name Of This Upgrade."
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
            description: "Septuple Points Gain.",
            cost: new Decimal("1e14"),
        },
        62: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "Are These Even Words?",
            description: "Octuple Points Gain.",
            cost: new Decimal("3e14"),
        },
        63: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "Still Strong",
            description: "Nonuple Points Gain.",
            cost: new Decimal("1e15"),
        },
        64: {
            unlocked() {
                return [51, 52, 53, 54, 55].every(id => hasUpgrade('u', id)) && hasAchievement('a', 12)
            },
            title: "10!",
            description: "Decuple Points Gain.",
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
    color: () => colors[getThemeName()].a, // Dynamic color based on theme
    tooltip: "Achievements",
    layerShown() {return hasUpgrade("u", 35)},
    unlocked() {true},
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
                if(hasUpgrade("u", 45)) return "Generate 10% Of Upgrade Points Per Second."
                if(hasAchievement("a", 11)) return "Generate 1% Of Upgrade Points Per Second."
                return "???"
            }
        },
        12: {
            effect() {
                return new Decimal(1.1).pow(Object.keys(layers.a.achievements).filter(x => Number(x) >= 20 && hasAchievement('a', x)).length)
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
            unlocked() {return hasUpgrade("u", 55)},
            name: "New Tab!",
            done() {return player.u.points.gte("1e14") && hasUpgrade("u", 55)},
            description() {
                return "Reach 1e14 Upgrade Points."
            },
            tooltip() {
                if(hasUpgrade("u", 65)) return "Unlock Secret Achievements And Boost Points And Upgrade Points By Secret Achievements. (1.1^SA)"
                if(hasAchievement("a", 12)) return "Unlock Secret Achievements And Boost Points By Secret Achievements. (1.1^SA)"
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
            name: "Intresting",
            done() {
                return player.checkedUpdateLog && hasAchievement("a", 12)
            },
            description () {
                if (hasAchievement("a", 25)) return "Check The Update Log."
                return "???"
            },
            unlocked() {return true},
            tooltip: "Good Job!"
        }
    },
})